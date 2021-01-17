import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  balance: {
    type: Number,
    default: 0.5,
  },
});

export default model('Shop', schema);
