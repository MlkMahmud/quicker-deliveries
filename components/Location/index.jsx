import React from 'react';
import { Card, Select } from '@shopify/polaris';
import { useStore } from '../../store';

export default () => {
  const { dispatch, state } = useStore();
  const {
    locations, start, stop,
  } = state;
  return (
    <>
      <Card
        actions={{
          content: 'Add Location',
          onAction: () => dispatch({ type: 'OPEN_ADD_LOCATION' }),
        }}
        sectioned
        title="Start/End of Route"
      >
        <div style={{ marginBottom: '20px' }}>
          <b>Start:</b>
          <Select
            label="start location"
            labelHidden
            name="start"
            options={locations}
            value={start}
            onChange={(payload) => dispatch({ type: 'UPDATE_START', payload })}
          />
        </div>
        <div>
          <b>End:</b>
          <Select
            label="end location"
            labelHidden
            name="end"
            options={locations}
            value={stop}
            onChange={(payload) => dispatch({ type: 'UPDATE_STOP', payload })}
          />
        </div>
      </Card>
    </>
  );
};
