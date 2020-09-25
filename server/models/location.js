import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  address: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  latLng: String,
  shopId: String,
});

export default model('Location', schema);
