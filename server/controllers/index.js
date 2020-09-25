import Shopify from 'shopify-api-node';
import mongoose from 'mongoose';
import { Location, Shop } from '../models';
import graphql from '../graphql';

function parseLocations(locations, shop) {
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

async function getLocations(shopName, accessToken) {
  const shopify = new Shopify({ shopName, accessToken });
  const query = graphql.GET_LOCATIONS();
  const {
    locations: { edges },
  } = await shopify.graphql(query);
  return parseLocations(edges, shopName);
}

export async function saveShop(shopName, accessToken) {
  const shop = await Shop.findById(shopName);
  if (!shop) {
    const locations = await getLocations(shopName, accessToken);
    const session = await mongoose.startSession();
    session.startTransaction();
    await Shop.create([{ _id: shopName, balance: 0.3 }], { session });
    await Location.insertMany(locations, { session });
    await session.commitTransaction();
  }
}

export async function getShopData(shopName) {
  const { _id, balance } = await Shop.findById(shopName);
  const locations = await Location.find({ shop: shopName });
  return { _id, balance, locations };
}
