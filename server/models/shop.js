import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  balance: Number,
});

export default model('Shop', schema);
