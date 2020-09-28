import Shopify from 'shopify-api-node';
import { CREATE_CHARGE } from '../utils';

async function createCharge(shopName, accessToken, price) {
  const shopify = new Shopify({ shopName, accessToken });
  const mutation = CREATE_CHARGE(price);
  const charge = await shopify.graphql(mutation);
  return charge;
}

export default {
  createCharge,
};
