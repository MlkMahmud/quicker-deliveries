import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  balance: {
    type: Number,
    default: 0.5,
  },
});

export default model('Shop', schema);
