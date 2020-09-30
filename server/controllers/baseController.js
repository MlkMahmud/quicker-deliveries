import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { Location, Shop } from '../models';
import { getLocations } from '../utils';

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

export default {
  addNewLocation,
  getShopData,
  saveShop,
};
