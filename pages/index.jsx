import React from 'react';
import { Page, Layout } from '@shopify/polaris';
import dynamic from 'next/dynamic';
import {
  Balance,
  Location,
  Orders,
} from '../components';
import { useStore } from '../store';

const AddLocation = dynamic(() => import('../components/AddLocation'));
const DeliveryRoute = dynamic(() => import('../components/DeliveryRoute'));
const RouteConfirmation = dynamic(() => import('../components/RouteConfirmation'));
const Topup = dynamic(() => import('../components/Topup'));
const Toast = dynamic(() => import('../components/Toast'));

export default () => {
  const { state } = useStore();
  return (
    <>
      <Page>
        <Layout>
          <Layout.Section oneHalf>
            <Balance />
          </Layout.Section>
          <Layout.Section oneHalf>
            <Location />
          </Layout.Section>
        </Layout>
        <div style={{ margin: '10px 0' }} />
        <Orders />
      </Page>
      {state.showAddLocation && <AddLocation />}
      {state.showDeliveryRoute && <DeliveryRoute />}
      {state.showTopup && <Topup />}
      {state.showRouteConfirmation && <RouteConfirmation />}
      {state.showToast && <Toast />}
    </>
  );
};

export async function getServerSideProps({ query, req }) {
  const { shop } = query;
  const url = `${process.env.BASE_URL}/shop`;
  const initialProps = {
    props: {
      balance: 0,
      locations: [],
      start: '',
      stop: '',
    },
  };

  if (!shop) {
    return initialProps;
  }

  const response = await fetch(url, {
    headers: { cookie: req.headers.cookie },
  });

  const { balance, locations } = await response.json();
  initialProps.props.balance = balance;
  initialProps.props.locations = locations.map(({ address, latLng }) => ({
    label: address,
    value: latLng,
  }));
  initialProps.props.start = locations[0] ? locations[0].latLng : '';
  initialProps.props.stop = locations[0] ? locations[0].latLng : '';
  return initialProps;
}
