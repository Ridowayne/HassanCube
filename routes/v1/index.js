const express = require('express');
const router = express.Router();
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');
const shoeRoutes = require('./shoeRoutes');

router.use('/order', orderRoutes);
router.use('/review', reviewRoutes);
router.use('/shoe', shoeRoutes);

module.exports = router;
