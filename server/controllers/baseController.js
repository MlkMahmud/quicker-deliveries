import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Shopify from 'shopify-api-node';
import { Location, Shop } from '../models';
import { isArchivedShop, getLocations, parseOrders } from '../utils';
import { bitly, googleMaps } from '../lib';

async function onInstall(shopName, accessToken) {
  const shopHash = bcrypt.hashSync(shopName, 10);
  const shop = await Shop.findOne({ name: { $in: [shopName, shopHash] } });
  if (!shop || isArchivedShop(shop.name)) {
    const locations = await getLocations(shopName, accessToken);
    const session = await mongoose.startSession();
    session.startTransaction();
    if (!shop) {
      await Shop.create([{ name: shopName }], { session });
    } else {
      await Shop.findOneAndUpdate({ name: shopHash }, { name: shopName }, { session });
    }
    await Location.insertMany(locations, { session });
    await session.commitTransaction();
  }
}

async function getShopData(shopName) {
  const { name, balance } = await Shop.findOne({ name: shopName });
  const locations = await Location.find({ shop: shopName });
  return { name, balance, locations };
}

async function addNewLocation(shop, location) {
  const { address, latLng } = location;
  const newLocation = await Location.create({
    address,
    latLng,
    shop,
  });
  return newLocation;
}

async function getOrders(shopName, accessToken, cursor) {
  const shopify = new Shopify({ shopName, accessToken });
  const params = {
    limit: 25,
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

async function getRouteUrl({
  origin, destination, waypoints,
}) {
  const { generateRouteUrl, getOptimizedWaypointOrder } = googleMaps;
  const waypointOrder = await getOptimizedWaypointOrder({
    origin, destination, waypoints,
  });
  const longUrl = await generateRouteUrl({
    origin, destination, waypoints, waypointOrder,
  });

  const shortUrl = await bitly.shortenUrl(longUrl);
  return shortUrl;
}

export default {
  addNewLocation,
  getOrders,
  getRouteUrl,
  getShopData,
  onInstall,
};
