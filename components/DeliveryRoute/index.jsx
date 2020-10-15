import React, { useRef } from 'react';
import { Button, Modal, TextField } from '@shopify/polaris';
import { useStore } from '../../store';

export default () => {
  const inputRef = useRef();
  const { dispatch, state } = useStore();
  const { showDeliveryRoute, deliveryRouteUrl } = state;

  const copy = () => {
    inputRef.current.querySelector('input').select();
    const result = document.execCommand('copy');
    if (result) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
          error: false,
          message: 'Copied link',
        },
      });
    } else {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
          error: true,
          message: 'Failed to copy link',
        },
      });
    }
    console.log(result);
  };

  return (
    <Modal
      open={showDeliveryRoute}
      sectioned
      title="Share delivery route"
      onClose={() => dispatch({ type: 'UNSET_ROUTE_URL' })}
    >
      <div ref={inputRef}>
        <TextField
          value={deliveryRouteUrl}
          readOnly
          label="directions url"
          labelHidden
          connectedRight={
            <Button primary onClick={copy}>Copy Link</Button>
          }
        />
      </div>
    </Modal>
  );
};
