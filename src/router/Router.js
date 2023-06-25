const router = require('express').Router();
const AdminController = require('../controller/AdminController');
const AuthController = require('../controller/AuthController')
const ProductController = require('../controller/ProductController');
const CartController = require('../controller/CartController');
const multerInstance = require("../../multer");
const PaymentController = require("../controller/PaymentController")

// Authentication
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

// Admin
router.get('/admin/:id', AdminController.findAdminById);
router.get('/admin-email/:email', AdminController.findByEmail);
router.get('/admins', AdminController.findAllAdmins);
router.get('/admin-phoneNumber/:phoneNumber', AdminController.findAdminByPhoneNumber);

// Product
router.post('/product/create',  multerInstance.single("image"), ProductController.createProduct);
router.get('/product/all', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getProductById)
router.put('/product/:id', ProductController.updatedProduct)
router.delete('/product/:id', ProductController.deleteProductById)

// Cart
router.post('/cart/addItem', CartController.addToCart);
router.put('/cart/:itemId', CartController.updateCartItem);
router.delete('/cart/:itemId', CartController.removeCartItem);

// Payment
router.post('/payment/initialize-payment', PaymentController.intializePayment)
router.get('/payment/verify-payment/:reference', PaymentController.verifyPayment)

module.exports = router;