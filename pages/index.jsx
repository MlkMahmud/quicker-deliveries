import React from 'react';
import { Page, Layout } from '@shopify/polaris';
import { Balance, Location } from '../components';

export default () => (
  <Page>
    <Layout>
      <Layout.Section oneHalf>
        <Balance />
      </Layout.Section>
      <Layout.Section oneHalf>
        <Location />
      </Layout.Section>
    </Layout>
  </Page>
);

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
