import { model, Schema } from 'mongoose';

const schema = new Schema({
  _id: String,
  balance: Number,
});

schema.methods.locations = function locations() {
  return model('Location').find({ shopId: this._id });
};

export default model('Shop', schema);
