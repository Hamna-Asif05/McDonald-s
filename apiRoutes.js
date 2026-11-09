const express = require('express');
const router = express.Router();

const { getMenu } = require('../controllers/menuController');
const { createOrder, getOrderById } = require('../controllers/orderController');
const { submitApplication } = require('../controllers/careerController');
const { submitTicket } = require('../controllers/contactController');
const { getBranches } = require('../controllers/branchController');

// Menu Endpoints
router.get('/menu', getMenu);

// Order & McDelivery Endpoints
router.post('/order', createOrder);
router.get('/order/:orderId', getOrderById);

// Careers Desk Endpoints
router.post('/careers', submitApplication);

// Contact Support Endpoints
router.post('/contact', submitTicket);

// Store Locator Endpoints
router.get('/branches', getBranches);

module.exports = router;