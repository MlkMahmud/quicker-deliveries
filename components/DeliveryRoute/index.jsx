import React, { useRef } from 'react';
import {
  Button, Modal, TextField,
} from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faAt, faMapMarkerAlt, faSms } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../store';

export default () => {
  const inputRef = useRef();
  const { dispatch, state } = useStore();
  const { showDeliveryRoute, deliveryRouteUrl } = state;

  const copy = () => {
    inputRef.current.querySelector('input').select();
    const result = document.execCommand('copy');
    if (result) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
          error: false,
          message: 'Copied link',
        },
      });
    } else {
      dispatch({
        type: 'SHOW_TOAST',
        payload: {
          error: true,
          message: 'Failed to copy link',
        },
      });
    }
  };

  return (
    <Modal
      open={showDeliveryRoute}
      title="Delivery route"
      onClose={() => dispatch({ type: 'UNSET_ROUTE_URL' })}
    >
      <Modal.Section>
        <div ref={inputRef}>
          <TextField
            helpText="Google maps link"
            value={deliveryRouteUrl}
            readOnly
            label="directions url"
            labelHidden
            connectedRight={
              <Button primary onClick={copy}>Copy</Button>
            }
          />
        </div>
      </Modal.Section>
      <Modal.Section>
        <div
          style={{
            marginBottom: '20px',
            textDecoration: 'underline',
            textAlign: 'center',
          }}
        >
          <b>Share delivery route</b>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          <a
            href={`https://wa.me?text=${encodeURI(deliveryRouteUrl)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#25d366',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <FontAwesomeIcon color="white" icon={faWhatsapp} size="2x" style={{ verticalAlign: 'middle' }} />
          </a>
          <a
            href={`sms:;?&body=${encodeURI(deliveryRouteUrl)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#000',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <FontAwesomeIcon color="white" icon={faSms} size="2x" style={{ verticalAlign: 'middle' }} />
          </a>
          <a
            href={`mailto:?body=${encodeURI(deliveryRouteUrl)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#DB4437',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <FontAwesomeIcon color="white" icon={faAt} size="2x" style={{ verticalAlign: 'middle' }} />
          </a>
          <a
            href={deliveryRouteUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#4285F4',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <FontAwesomeIcon color="white" icon={faMapMarkerAlt} size="2x" style={{ verticalAlign: 'middle' }} />
          </a>
        </div>
      </Modal.Section>
    </Modal>
  );
};
