const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: Buffer
    }
})

productSchema.pre('save', function (next) {
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId().toString();
    }
    return next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;