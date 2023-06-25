const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    _id: {
      type: String
    },
    streetName: {
      type: String
    },
    streetNo: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    localGovernment: {
      type: String
    }
  },
  { timestamps: true }
);

addressSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId().toString();
  }
  return next();
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
