import React, { useState, useContext } from 'react';
import { Modal, TextField } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import { useStore } from '../../store';

export default () => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const app = useContext(Context);
  const { dispatch, state: { isTopUpModalOpen } } = useStore();

  const confirmPayment = async (price) => {
    try {
      setisLoading(true);
      const response = await fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }),
      });
      if (response.ok) {
        const { confirmationUrl } = await response.json();
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_PATH, confirmationUrl);
      } else throw new Error(response.statusText);
    } catch (error) {
      setisLoading(false);
      dispatch({
        type: 'ERROR',
        payload: {
          message: 'Payment failed, please try again',
          error: true,
        },
      });
    }
  };

  const dismissModal = () => {
    if (isLoading) return;
    dispatch({ type: 'CLOSE_TOPUP' });
  };

  return (
    <Modal
      open={isTopUpModalOpen}
      onClose={dismissModal}
      title="Top-up balance"
      primaryAction={{
        content: 'Continue',
        onAction: () => {
          confirmPayment(amount);
        },
        accessibilityLabel: 'confirm payment',
        disabled: amount < 0.5 || isLoading,
        loading: isLoading,
      }}
    >
      <Modal.Section>
        <div>
          <b>Amount:</b>
        </div>
        <TextField
          helpText="Amount must be at least $0.5"
          label="amount"
          labelHidden
          value={amount}
          onChange={setAmount}
          min={0.5}
          type="number"
          step={0.5}
          prefix={<b>$</b>}
        />
      </Modal.Section>
    </Modal>
  );
};
