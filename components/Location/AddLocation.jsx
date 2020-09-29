/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Modal, Spinner } from '@shopify/polaris';
import PlacesAutocomplete from 'react-places-autocomplete';
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
  const [isLoading] = useState(false);
  const {
    dispatch,
    state: { isAddLocationOpen },
  } = useStore();

  const closeModal = () => {
    if (!isLoading) {
      dispatch({
        type: 'CLOSE ADD LOCATION',
      });
    }
  };

  return (
    <Modal
      open={isAddLocationOpen}
      onClose={closeModal}
      title="Add custom location"
      primaryAction={{
        content: 'Save',
        accessibilityLabel: 'save location',
        loading: isLoading,
        disabled: isLoading,
        // onAction: () => {
        //   handleSubmit(address);
        // },
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
