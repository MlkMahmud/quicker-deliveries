/* eslint-disable camelcase */
import Shopify from 'shopify-api-node';

const GET_ORDERS_QUERY = `
query {
  locations(first:10, query:"active:true") {
    edges {
      node {
        id
        address {
          formatted
          longitude
          latitude
        }
        addressVerified
        fulfillmentService {
          id
        }
      }
    }
  }
}
`;

export const CREATE_CHARGE = (price) => {
  const returnUrl = `${process.env.BASE_URL}/charge`;
  return `mutation {
      appPurchaseOneTimeCreate(name: "Top-up available balance", returnUrl: "${returnUrl}", price: { amount: ${price}, currencyCode: USD }, test: true) {
        appPurchaseOneTime {
          id
        }
        confirmationUrl  
        }
      }
    `;
};

export function parseLocations(locations, shop) {
  return locations
    .filter(({ node }) => {
      const { addressVerified, fulfillmentService } = node;
      return addressVerified && !fulfillmentService;
    })
    .map(({ node }) => {
      const {
        id,
        address: { formatted, longitude, latitude },
      } = node;
      return {
        _id: id,
        address: formatted.join(', '),
        latLng: `${latitude},${longitude}`,
        shop,
      };
    });
}

export async function getLocations(shopName, accessToken) {
  const shopify = new Shopify({ shopName, accessToken });
  const query = GET_ORDERS_QUERY;
  const {
    locations: { edges },
  } = await shopify.graphql(query);
  return parseLocations(edges, shopName);
}

function formatShippingAddress(address) {
  if (!address) return '';
  const {
    address1, address2, city, province, zip, country,
  } = address;
  return [address1, address2, city, province, zip, country]
    .filter((item) => item)
    .join(', ');
}

function formatCustomerName(customer) {
  if (!customer) return '';
  return [customer.first_name, customer.last_name]
    .filter((name) => name)
    .join(' ');
}

export function parseOrders(orders) {
  return orders.map(({
    id, name, customer, shipping_address,
  }) => {
    let addressVerified;
    if (!shipping_address) {
      addressVerified = false;
    } else {
      const { latitude, longitude } = shipping_address;
      addressVerified = (latitude !== null && longitude !== null);
    }
    return {
      id,
      name,
      customer: formatCustomerName(customer),
      address: formatShippingAddress(shipping_address),
      latLng: addressVerified ? `${shipping_address.latitude},${shipping_address.longitude}` : null,
    };
  });
}
