const express = require("express");
const router = express.Router();
const AdminController = require('../controller/AdminController');
const AuthController = require('../controller/AuthController')
const ProductController = require('../controller/ProductController');
const CartController = require('../controller/CartController');
const multerInstance = require("../../multer");
const PaymentController = require("../controller/PaymentController")
const SessionController = require('../controller/SessionController')
const OrderController = require('../controller/OrderController')
const SubscribeController = require('../controller/SubscribeController')

// Authentication
router.route('/auth/login').post(AuthController.login)
router.route('/auth/register').post(AuthController.register)

// Admin
router.route('/admin/:id').get(AdminController.findAdminById)
router.route('/admin-email/:email').get(AdminController.findByEmail)
router.route('/admins').get(AdminController.findAllAdmins)
router.route('/admin-email/:email').get(AdminController.findByEmail)
router.route('/admin-phoneNumber/:phoneNumber').get(AdminController.findAdminByPhoneNumber);

// Product
router.post('/product/create', multerInstance.single("image"), ProductController.createProduct);
router.route('/product/all').get(ProductController.getAllProducts);
router.route('/product/:id').get(ProductController.getProductById);
router.route('/product/:id').put(ProductController.updatedProduct);
router.route('/product/:id').delete(ProductController.deleteProductById);

// Cart
router.route('/cart/create/:sessionId').post(CartController.createCart)
router.route('/cart/addItem').post(CartController.addToCart);
router.route('/cart/:itemId').put(CartController.updateCartItem);
router.route('/cart/:cartId/:sessionId/:productId').delete(CartController.removeCartItem);
router.route('/cart/:cartId/all/:sessionId').get(CartController.getAllItemsInCart);
router.route('/cart/:sessionId').get(CartController.getCartBySessionId);
router.delete('/cart/carts/:cartId/all/:sessionId', CartController.removeAllItemsFromCart);

// Payment
router.route('/payment/initialize-payment').post(PaymentController.initializePayment);
router.route('/payment/verify-payment/:reference').get(PaymentController.verifyPayment);

// Session
router.route('/session/all').get(SessionController.getAllSession);
router.route('/session/:id').get(SessionController.getSessionById);
router.route('/session').post(SessionController.createSession);
router.route('/session/:id').delete(SessionController.deleteSession);

// Order

router.get('/orders/:sessionId/:cartId', OrderController.findBySessionIdAndCartId);
router.delete('/orders/:orderId', OrderController.deleteByOrderId);
router.post('/orders/:sessionId/:cartId', OrderController.createBySessionIdAndCartId);
router.get('/orders', OrderController.findAllOrders);
router.put('/orders/:orderId', OrderController.updateOrders);
router.delete('/orders', OrderController.deleteAllOrders);

// Subscribe
router.post('/subscribe', SubscribeController.addSubscriber)

module.exports = router;