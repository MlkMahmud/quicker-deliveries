const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'OPEN_TOPUP':
      return {
        ...state,
        isTopUpModalOpen: true,
      };
    case 'CLOSE_TOPUP':
      return {
        ...state,
        isTopUpModalOpen: false,
      };
    case 'OPEN_ADD_LOCATION':
      return {
        ...state,
        isAddLocationOpen: true,
      };
    case 'CLOSE_ADD_LOCATION':
      return {
        ...state,
        isAddLocationOpen: false,
      };
    case 'DEBIT':
      return {
        ...state,
        balance: state.balance - payload,
      };
    case 'ADD_LOCATION':
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
        isAddLocationOpen: false,
      };
    case 'UPDATE_START':
      return {
        ...state,
        start: payload,
      };
    case 'UPDATE_STOP':
      return {
        ...state,
        stop: payload,
      };
    case 'DISMISS_TOAST':
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
