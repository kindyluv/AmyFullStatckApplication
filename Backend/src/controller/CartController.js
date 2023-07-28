const CartService = require ('../services/CartService');

const createCart = (req, res) => {
  CartService.createCart(req.params)
  .then(response => {
    res.json({
      response
    })
  })
  .catch(error => {
    res.json ({
      message: error,
    });
  })
}

const addToCart = (req, res) => {
  CartService.addToCart (req.body)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getAllItemsInCart = (req, res) => {
  CartService.getAllItemsInCart(req.params)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const updateCartItem = (req, res) => {
  CartService.updateCartItem (req.params.itemId, req.body)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const removeCartItem = (req, res) => {
  CartService.removeCartItem (req.params)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getCartBySessionId = async(req, res) =>{
  await CartService.getCartBySessionId(req.params.sessionId)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })
}

const removeAllItemsFromCart = async(req, res) => {
  await CartService.removeAllItemsFromCart(req.params)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

module.exports = { createCart, addToCart, updateCartItem, removeCartItem, getAllItemsInCart, getCartBySessionId, removeAllItemsFromCart };
