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
