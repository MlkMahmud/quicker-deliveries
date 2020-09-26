const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'OPEN TOPUP':
      return {
        ...state,
        isTopUpModalOpen: true,
      };
    case 'CLOSE TOPUP':
      return {
        ...state,
        isTopUpModalOpen: false,
      };
    case 'DEBIT':
      return {
        ...state,
        balance: state.balance - payload,
      };
    case 'ADD LOCATION':
      return {
        ...state,
        locations: [
          ...state.locations,
          {
            label: payload.label,
            value: payload.value,
          },
        ],
        showToast: true,
        toast: {
          message: payload.message,
          error: payload.error,
        },
      };
    case 'UPDATE START':
      return {
        ...state,
        start: payload,
      };
    case 'UPDATE STOP':
      return {
        ...state,
        stop: payload,
      };
    case 'DISMISS TOAST':
      return {
        ...state,
        showToast: false,
        toast: {},
      };
    case 'ERROR':
      return {
        ...state,
        showToast: true,
        toast: {
          message: payload.message,
          error: payload.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
