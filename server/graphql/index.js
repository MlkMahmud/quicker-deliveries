export default {
  GET_LOCATIONS() {
    return `
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
  },
};
