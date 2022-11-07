const express = require('express');
const router = express.Router();
const allRoutes = require('./v1/index');

router.use('/v1', allRoutes);

module.exports = router;
