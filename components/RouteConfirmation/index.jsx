import React, { useState } from 'react';
import { Modal, Stack, TextStyle } from '@shopify/polaris';
import { useStore } from '../../store';

export default () => {
  const [isLoading, setLoading] = useState(false);
  const { dispatch, state } = useStore();
  const {
    balance,
    locations,
    showRouteConfirmation,
    start,
    stop,
    waypoints,
  } = state;

  const totalCost = (waypoints.length * 0.02).toFixed(2);
  const insufficientFunds = balance < totalCost;
  const startLabel = locations.find(({ value }) => value === start).label;
  const stopLabel = locations.find(({ value }) => value === stop).label;
  const handleClose = () => {
    if (!isLoading) {
      dispatch({
        type: 'CLOSE_ROUTE_CONFIRMATION',
      });
    }
  };

  const generateRouteUrl = async () => {
    try {
      setLoading(true);
      const response = await fetch('/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: start,
          destination: stop,
          waypoints: waypoints.map(({ latLng }) => latLng),
        }),
      });
      if (response.ok) {
        const { routeUrl } = await response.json();
        dispatch({
          type: 'SET_ROUTE_URL',
          payload: {
            routeUrl,
          },
        });
      } else throw new Error('Failed to generate route');
    } catch (e) {
      setLoading(false);
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          message: e.message,
        },
      });
    }
  };

  return (
    <Modal
      title="Confirm route details"
      primaryAction={{
        content: 'Continue',
        onAction: generateRouteUrl,
        disabled: insufficientFunds,
        loading: isLoading,
      }}
      onClose={handleClose}
      open={showRouteConfirmation}
    >
      <Modal.Section>
        <Stack>
          <Stack.Item>
            <b>Origin:</b>
            {' '}
            {startLabel}
          </Stack.Item>
          <Stack.Item>
            <b>Destination:</b>
            {' '}
            {stopLabel}
          </Stack.Item>
        </Stack>
      </Modal.Section>
      {(waypoints.length > 0) && (
        <Modal.Section>
          <div style={{ marginBottom: '10px' }}>
            <b>Stops:</b>
          </div>
          <Stack>
            {waypoints.map((waypoint, index) => (
              <Stack.Item>
                <b>
                  {index + 1}
                  .
                </b>
                {' '}
                {waypoint.address}
              </Stack.Item>
            ))}
          </Stack>
        </Modal.Section>
      )}
      {insufficientFunds && (
        <div style={{ margin: '10px  0' }}>
          <TextStyle variation="negative">
            {`You need $${totalCost} to complete this action. Please top-up your available balance to continue.`}
          </TextStyle>
        </div>
      )}
    </Modal>
  );
};
