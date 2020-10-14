/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Modal, Spinner } from '@shopify/polaris';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  Dropdown,
  Input,
  MainText,
  MarkerIcon,
  PlaceItem,
} from '../AutoComplete';
import { useStore } from '../../store';

export default () => {
  const [address, updateAddress] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {
    dispatch,
    state: { showAddLocation },
  } = useStore();

  const closeModal = () => {
    if (!isLoading) {
      dispatch({
        type: 'CLOSE_ADD_LOCATION',
      });
    }
  };

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const [result] = await geocodeByAddress(value);
      const { lat, lng } = await getLatLng(result);
      const response = await fetch('/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          latLng: `${lat},${lng}`,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: 'ADD_LOCATION',
          payload: {
            label: data.address,
            value: data.latLng,
            message: 'Successfully added location',
            error: false,
          },
        });
      } else throw new Error(response.statusText);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          message: 'Failed to add location',
          error: true,
        },
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showAddLocation}
      onClose={closeModal}
      title="Add custom location"
      primaryAction={{
        content: 'Save',
        accessibilityLabel: 'save location',
        loading: isLoading,
        disabled: isLoading,
        onAction: () => {
          handleSubmit(address);
        },
      }}
    >
      <Modal.Section>
        <b>Enter address:</b>
        <PlacesAutocomplete
          value={address}
          onChange={updateAddress}
          onSelect={updateAddress}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <Input
                label="address"
                {...getInputProps({
                  autoComplete: 'new-password',
                })}
              />
              <Dropdown suggestions={suggestions}>
                {loading && <Spinner size="small" />}
                {suggestions.map((suggestion) => {
                  const {
                    id,
                    formattedSuggestion: { mainText, secondaryText },
                    active,
                  } = suggestion;
                  return (
                    <PlaceItem
                      active={active}
                      key={id}
                      {...getSuggestionItemProps(suggestion)}
                    >
                      <MarkerIcon active={active} />
                      <MainText>{mainText}</MainText>
                      <span>{secondaryText}</span>
                    </PlaceItem>
                  );
                })}
                <div style={{ textAlign: 'right', padding: '5px 5px 5px 0' }}>
                  <img
                    src="/powered_by_google.png"
                    alt=""
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </Dropdown>
            </div>
          )}
        </PlacesAutocomplete>
      </Modal.Section>
    </Modal>
  );
};
