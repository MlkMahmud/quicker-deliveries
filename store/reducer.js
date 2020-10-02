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
    case 'UPDATE_ORDERS':
      return {
        ...state,
        orders: [...state.orders, ...payload.orders],
        currentPage: state.currentPage + 1,
        nextPageParameters: payload.nextPageParameters,
      };
    case 'UPDATE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + payload,
      };
    case 'UPDATE_WAYPOINTS':
      return {
        ...state,
        waypoints: payload,
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
