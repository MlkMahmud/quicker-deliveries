import Shopify from 'shopify-api-node';
import { CREATE_CHARGE } from '../utils';

async function createCharge(shopName, accessToken, price) {
  const shopify = new Shopify({ shopName, accessToken });
  const mutation = CREATE_CHARGE(price);
  const charge = await shopify.graphql(mutation);
  return charge;
}

async function getCharge(shopName, accessToken, id) {
  const shopify = new Shopify({ shopName, accessToken });
  const charge = await shopify.applicationCharge.get(id);
  return charge;
}

export default {
  createCharge,
  getCharge,
};
