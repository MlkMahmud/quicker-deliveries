import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  balance: Number,
  locations: [{
    type: String,
    ref: 'Location',
  }],
});

export default model('Shop', schema);
