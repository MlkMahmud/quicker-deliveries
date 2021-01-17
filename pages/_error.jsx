import React from 'react';
import PropTypes from 'prop-types';
import NextErrorComponent from 'next/error';
import { ErrorPage } from '../components';
import { Sentry } from '../server/lib';

const Error = ({ hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return (<ErrorPage />);
};

Error.defaultProps = {
  err: null,
  hasGetInitialPropsRun: undefined,
};

Error.propTypes = {
  err: PropTypes.shape(),
  hasGetInitialPropsRun: PropTypes.bool,
};

Error.getInitialProps = async ({ asPath, err, res }) => {
  const initialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  initialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return initialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );
  await Sentry.flush(2000);
  return initialProps;
};

export default Error;
