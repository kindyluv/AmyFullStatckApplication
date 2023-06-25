const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product')

const cartSchema = new Schema({
    _id: {
        type: String
    },
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
    ]
}, {timestamps: true})

cartSchema.pre('save', function (next) {
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId().toString();
    }
    return next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;