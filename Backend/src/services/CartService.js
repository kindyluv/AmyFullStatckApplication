const Cart = require ('../models/Cart');
const ProductService = require ('../services/ProductService');

const createCart = async (request) => {
  const { sessionId } = request;
  const cart = await Cart.findOne ({sessionId: sessionId});

  if (cart) {
    return {
      message: `Cart with this session id ${sessionId} already exists`,
      data: [],
    };
  } else {
    const newCart = new Cart ({
      sessionId,
      items: [],
    });
    const savedCart = await newCart.save ();

    return {
      message: 'Empty cart created successfully',
      data: savedCart,
    };
  }
};

const addToCart = async (request) => {
  try {
    const {cartId, productId, sessionId} = request;

    let cart = await Cart.findOne ({_id: cartId, sessionId});
    const product = await ProductService.getProductById (productId);

    if (!cart) {
      const newCart = new Cart ({
        _id: cartId,
        sessionId,
        items: [{productId, quantity: 1}],
      });
      cart = await newCart.save ();
    } else {
      const existingItem = cart.items.find (item =>
        item.productId.equals (productId)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push ({productId, quantity: 1});
      }

      cart = await cart.save ();
    }

    return {
      message: 'Item added to cart successfully',
      data: cart,
    };
  } catch (error) {
    return {
      message: `Failed to add item to cart ${error}`,
      data: 'Try Again',
    };
  }
};

const getAllItemsInCart = async (request) => {
  try {
    const { sessionId, cartId } = request;
    const cart = await Cart.findOne({ _id: cartId, sessionId: sessionId }).populate('items.productId');
    if (!cart) {
      throw new Error('Cart not found');
    }

    const items = cart.items ? cart.items.map((item) => {
      const { productId, quantity } = item;
      const { _id, name, price, salesPrice, image } = productId;

      return {
        productId: _id,
        name,
        price,
        salesPrice,
        quantity,
        image: `data:image/jpeg;base64, ${image}`,
      };
    }) : [];
    return {
      message: 'Items in cart retrieved successfully',
      data: items,
    };
  } catch (error) {
    // console.error(error);
    return {
      message: `Failed to retrieve items in cart: ${error}`,
      data: null,
    };
  }
};

const getCartBySessionId = async (sessionId) => {
  try {
    const cart = await Cart.findOne ({sessionId}).populate ('items.productId');
    if (!cart) {
      return {
        message: 'No cart found',
        data: null,
      };
    }
    return {
      message: 'Cart found',
      data: cart,
    };
  } catch (error) {
    return {
      message: `Failed to retrieve cart: ${error}`,
      data: null,
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

const removeCartItem = async (request) => {
  const { productId, sessionId, cartId } = request;
  try {
    const cart = await Cart.findOneAndUpdate (
      {_id: cartId, sessionId: sessionId, 'items.productId': productId},
      {$pull: {items: {productId: productId}}},
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

const removeAllItemsFromCart = async (request) => {
  const { cartId, sessionId } = request;
  try {
    const cart = await Cart.findOneAndUpdate(
      { _id: cartId, sessionId: sessionId },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      throw new Error('Cart not found');
    }

    return {
      message: 'All items removed from cart successfully',
      data: cart,
    };
  } catch (error) {
    // console.error(error);
    return {
      message: `Failed to remove items from cart: ${error}`,
      data: null,
    };
  }
};


module.exports = {
  createCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  getAllItemsInCart,
  getCartBySessionId,
  removeAllItemsFromCart,
};
