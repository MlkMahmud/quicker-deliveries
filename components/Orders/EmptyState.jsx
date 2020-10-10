import React from 'react';
import { Button } from '@shopify/polaris';
import PropTypes from 'prop-types';

const EmptyState = ({ error, handleClick }) => {
  const imgSrc = error ? '/error.png' : '/empty_state.png';
  return (
    <div style={{ textAlign: 'center', padding: '20px 0 10px 0' }}>
      <img
        alt=""
        src={imgSrc}
        style={{ maxWidth: '250px', width: '100%' }}
      />
      {error ? (
        <>
          <p
            style={{ fontWeight: 'bold', margin: '10px 0', textTransform: 'uppercase' }}
          >
            Uh Oh!
          </p>
          <p style={{ marginBottom: '10px' }}>We seem to have run into some network issues</p>
          <div style={{ marginBottom: '20px' }}>
            <Button primary onClick={handleClick}>Reload orders</Button>
          </div>
          <small>
            Illustration by
            {' '}
            <a href="https://icons8.com/illustrations/author/5e7e24ce01d0360013bb7479">Natasha Remarchuk</a>
            {' '}
            from
            {' '}
            <a href="https://icons8.com/">Icons8</a>
          </small>
        </>
      ) : (
        <>
          <p
            style={{ margin: '20px 0', textDecoration: 'underline', textTransform: 'uppercase' }}
          >
            There are currently no orders to be fulfilled
          </p>
          <small>
            Illustration by
            {' '}
            <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">Icons 8</a>
            {' '}
            from
            {' '}
            <a href="https://icons8.com/">Icons8</a>
          </small>
        </>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  error: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default EmptyState;
