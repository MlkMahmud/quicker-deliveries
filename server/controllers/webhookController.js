import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Shop, Location } from '../models';

async function archiveShopData(shop) {
  const shopHash = bcrypt.hashSync(shop, 10);
  const session = await mongoose.startSession();
  session.startTransaction();
  await Location.deleteMany({ shop }, { session });
  await Shop.findOneAndUpdate({ name: shop }, { name: shopHash }, { session });
  await session.commitTransaction();
}

export default {
  archiveShopData,
};
