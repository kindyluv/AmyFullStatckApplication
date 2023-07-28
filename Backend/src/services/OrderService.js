const Order = require('../models/Order');
const ProductService = require('../services/ProductService')

async function findBySessionIdAndCartId(sessionId, cartId) {
  return await Order.findOne({ sessionId, cartId });
}

async function deleteByOrderId(orderId) {
  return await Order.findOneAndDelete({ _id: orderId });
}

async function createBySessionIdAndCartId(sessionId, cartId, orderData) {
  try{
    const order = new Order({
      sessionId,
      cartId,
      ...orderData,
    });
    await order.validate();
    const savedOrder = await order.save();
    return {
      data: savedOrder,
      message: 'Order created successfully'
    }
  } catch (error) {
    return{
      data: error,
      message: 'An error occurred while creating order',
    }
  }
}

const findAllOrders = async () => {
  try {
    const orders = await Order.find();

    const orderPromises = orders.map(async (order) => {
      const productPromises = order.items.map(async (item) => {
        const productResponse = await ProductService.getProductById(item.productId);

        if (productResponse.data) {
          const product = productResponse.data;

          return {
            name: product.name,
            image: product.image,
            quantity: item.quantity
          };
        } else {
          throw new Error(`Failed to fetch product: ${productResponse.message}`);
        }
      });

      const products = await Promise.all(productPromises);

      return {
        ...order.toJSON(),
        items: products
      };
    });

    const ordersWithProducts = await Promise.all(orderPromises);

    return ordersWithProducts;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error}`);
  }
};

async function deleteAllOrders() {
  return await Order.deleteMany();
}

async function updateOrder(orderId, updatedData) {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        message: 'Order not found',
      };
    }

    Object.assign(order, updatedData);
    await order.validate();
    const updatedOrder = await order.save();

    return {
      data: updatedOrder,
      message: 'Order updated successfully',
    };
  } catch (error) {
    return {
      data: error,
      message: 'An error occurred while updating the order',
    };
  }
}

module.exports = {
  updateOrder,
  findBySessionIdAndCartId,
  deleteByOrderId,
  createBySessionIdAndCartId,
  findAllOrders,
  deleteAllOrders,
};
