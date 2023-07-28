const orderService = require('../services/OrderService');

async function findBySessionIdAndCartId(req, res) {
  const { sessionId, cartId } = req.params;
  await orderService.findBySessionIdAndCartId(sessionId, cartId)
  .then((response)=>{
    res.json(response)
  })
  .catch((error)=>{
    res.json(error)
  })
}

async function deleteByOrderId(req, res) {
  const { orderId } = req.params;
  try {
    await orderService.deleteBySessionIdAndCartId(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createBySessionIdAndCartId(req, res) {
  const { sessionId, cartId } = req.params;
  const orderData = req.body;
  await orderService.createBySessionIdAndCartId(sessionId, cartId, orderData)
  .then((response) => {
    res.json(response)
  })
  .catch((error)=>{
    res.json(error)
  })
}

async function findAllOrders(req, res) {
  try {
    const orders = await orderService.findAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteAllOrders(req, res) {
  try {
    await orderService.deleteAllOrders();
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateOrders(req, res) {
  try {
    await orderService.updateOrder(req.params.orderId, req.body)
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  updateOrders,
  findBySessionIdAndCartId,
  deleteByOrderId,
  createBySessionIdAndCartId,
  findAllOrders,
  deleteAllOrders,
};
