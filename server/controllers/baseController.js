import mongoose from 'mongoose';
import Shopify from 'shopify-api-node';
import { v4 } from 'uuid';
import { Location, Shop } from '../models';
import { getLocations, parseOrders } from '../utils';

async function saveShop(shopName, accessToken) {
  const shop = await Shop.findById(shopName);
  if (!shop) {
    const locations = await getLocations(shopName, accessToken);
    const session = await mongoose.startSession();
    session.startTransaction();
    await Shop.create([{ _id: shopName }], { session });
    await Location.insertMany(locations, { session });
    await session.commitTransaction();
  }
}

async function getShopData(shopName) {
  const { _id, balance } = await Shop.findById(shopName);
  const locations = await Location.find({ shop: shopName });
  return { _id, balance, locations };
}

async function addNewLocation(shop, location) {
  const { address, latLng } = location;
  const newLocation = await Location.create({
    _id: v4(),
    address,
    latLng,
    shop,
  });
  return newLocation;
}

async function getOrders(shopName, accessToken, cursor) {
  const shopify = new Shopify({ shopName, accessToken });
  const params = {
    limit: 2,
    status: 'open',
    fields: ['id', 'name', 'customer', 'shipping_address'],
  };
  if (cursor) {
    params.page_info = cursor;
    delete params.status;
  }
  const data = await shopify.order.list(params);
  const nextPageParameters = data.nextPageParameters?.page_info;
  return {
    nextPageParameters,
    orders: parseOrders(data),
  };
}

export default {
  addNewLocation,
  getOrders,
  getShopData,
  saveShop,
};
