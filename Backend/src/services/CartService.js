const Cart = require ('../models/Cart');
const ProductService = require ('../services/ProductService');

const addToCart = async (request) => {
  try {
    const {productId} = request;

    const cart = await Cart.findOne ();
    const product = await ProductService.getProductById (productId);

    if (!cart) {
      const newCart = new Cart ({items: [{productId, quantity: 1}]});
      const savedCart = await newCart.save ();
      return {
        message: 'Item added to cart successfully',
        data: savedCart,
      };
    } else {
      const existingItem = cart.items.find (item =>
        item.productId.equals (productId)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push ({productId, quantity: 1});
      }

      const savedCart = await cart.save ();

      return {
        message: 'Item added to cart successfully',
        data: savedCart,
      };
    }
  } catch (error) {
    return {
      message: `Failed to add item to cart ${error}`,
      data: 'Try Again',
    };
  }
};

const updateCartItem = async (itemId, quantity) => {
  try {
    const cart = await Cart.findOneAndUpdate (
      {'items._id': itemId},
      {$set: {'items.$.quantity': quantity}},
      {new: true}
    );

    if (!cart) throw new NotFoundException ('Cart not found');

    return {
      message: 'Cart updated Successfully',
      data: cart,
    };
  } catch (error) {
    return {
      message: `Failed to update cart entry ${error}`,
      data: 'Try Again',
    };
  }
};

const removeCartItem = async (itemId) => {
  try {
    const cart = await Cart.findOneAndUpdate (
      {'items._id': itemId},
      {$pull: {items: {_id: itemId}}},
      {new: true}
    );

    if (!cart) throw new NotFoundException ('Item not found in cart');

    return {
      message: 'Cart item removed successfully',
      data: cart,
    };
  } catch (error) {
    return {
      message: `Failed to remove item from cart ${error}`,
      data: 'Try Again',
    };
  }
};

module.exports = {addToCart, updateCartItem, removeCartItem};
