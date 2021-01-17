import React from 'react';
import { Toast } from '@shopify/app-bridge-react';
import { useStore } from '../../store';

export default () => {
  const { state: { toast }, dispatch } = useStore();
  return (
    <Toast
      content={toast.message}
      error={toast.error}
      onDismiss={() => dispatch({ type: 'DISMISS_TOAST' })}
    />
  );
};
