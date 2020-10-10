import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';

const Context = createContext({});
const initialState = {
  currentPage: 0,
  initialLoadErrored: false,
  isAddLocationOpen: false,
  isTopUpModalOpen: false,
  isWayConfirmationOpen: false,
  nextPageParameters: '',
  orders: [],
  showToast: false,
  toast: {},
  waypoints: [],
};

export const Store = ({ children, pageProps }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...pageProps });
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

Store.propTypes = {
  children: PropTypes.node.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export const useStore = () => useContext(Context);
