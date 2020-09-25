/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';
import cookie from 'js-cookie';
import PropTypes from 'prop-types';

const config = {
  apiKey: process.env.API_KEY,
  shopOrigin: cookie.get('shopOrigin'),
  forceRedirect: true,
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSJ7hxqfk0TdQ1m5XuQVaJrMiACf5ab40&libraries=places" />
      </Head>
      <Provider config={config}>
        <AppProvider i18n={enTranslations}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.shape().isRequired,
};
