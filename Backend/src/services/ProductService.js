const Product = require('../models/Product');
const fs = require('fs');

const saveProduct = async (request, imageRequest) => {
    try{
        const { name, price } = request;
        // const { image } = imageRequest.file;
        const imageBuffer = fs.readFileSync(imageRequest.file.path);

        let product = new Product({ name, price, image: imageBuffer });

        let savedProduct = await product.save();

        let response = {
            id: savedProduct._id,
            name: savedProduct.name,
            price: savedProduct.price,
            description: savedProduct.description,
            image: savedProduct.image
        }

        return{
            message: 'Product Successfully Created',
            data: response
        }
    }catch(error){
        return{
            message: `Failed to create the product ${error}`,
            data: 'Try Again'
        }
    }
}

const getAllProducts = async () => {
    try {
        const products = await Product.find();

        const response = products.map(product => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
            };
        });

        return {
            message: 'Products Retrieved Successfully',
            data: response,
            length: products.length
        };

    } catch (error) {
        return{
            message: `Failed to retrieve products ${error}`,
            data: 'Try Again'
        }
    }
}

const getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if(!product) throw new NotFoundException(`Product with id ${productId} not found`)

        return{
            message: 'Product Retrieved Successfully',
            data: product
        }
    } catch (error) {
        return{
            message: `Failed to retrieve product ${error}`,
            data: 'Try Again'
        }
    }
}

const updateProductById = async (request) => {
    try {
      const productId = request.id;
      const { name, price, image } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, image },
        { new: true }
      );
      if(!updatedProduct) throw new NotFoundException(`Product with id ${productId} not found`)
    
      return{
        message: 'Product Successfully Updated',
        data: updatedProduct
        }
    } catch (error) {
        return{
            message: `Failed to update product ${error}`,
            data: 'Try Again'
        }
    }
};

const deleteProductById = async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) throw new NotFoundException(`Product with id ${productId} not found`)

      return {
        message: 'Product deleted successfully',
        data: deletedProduct,
      };

    } catch (error) {
        return{
            message: `Failed to delete product ${error}`,
            data: 'Try Again'
        }
    }
  };
  
  module.exports = {
    saveProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
  };