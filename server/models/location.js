import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  address: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  latLng: String,
  shop: { type: String, ref: 'Shop' },
});

export default model('Location', schema);
