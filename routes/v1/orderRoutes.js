const express = require('express');
const router = express.Router();
router.route('/getSellerOrder').get();
router.route('/getMyOrders').get();
router.route('/getAllOrders').get();
router.route('/makeOrder').post();
router.route('/UpdateAddres').patch();

module.exports = router;
