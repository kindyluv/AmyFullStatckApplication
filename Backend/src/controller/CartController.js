const CartService = require ('../services/CartService');

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
  CartService.getAllItemsInCart ()
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
  CartService.removeCartItem (req.params.itemId)
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

module.exports = {addToCart, updateCartItem, removeCartItem, getAllItemsInCart};
