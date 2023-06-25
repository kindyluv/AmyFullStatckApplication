const ProductService = require('../services/ProductService');


const createProduct = (req, res) => {
  console.log('request --> ', req.body)
    ProductService.saveProduct(req.body, req)
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
}

const getAllProducts = (req, res) => {
    ProductService.getAllProducts()
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

const getProductById = (req, res) => {
    ProductService.getProductById(req.param.id)
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

const updatedProduct = (req, res) => {
    ProductService.updateProductById(req)
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

const deleteProductById = (req, res) => {
    ProductService.deleteProductById(req.param.id)
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

module.exports = { createProduct, getAllProducts, getProductById, updatedProduct, deleteProductById };