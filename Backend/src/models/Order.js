const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = require('./Cart');

const orderSchema = new Schema({
  _id: {
    type: String,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  country: {
    type: String,
  },
  streetAddress: {
    type: String,
  },
  town: {
    type: String,
  },
  state: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  orderNote: {
    type: String,
  },
  items: {
    type: []
  }
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId().toString();
  }
  return next();
});

const OrderHistory = mongoose.model('OrderHistory', orderSchema);
module.exports = OrderHistory;
