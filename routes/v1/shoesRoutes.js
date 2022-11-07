const express = require('express');
const router = express.Router();

router.route('/getAllShoes').get();
router.route('/getOneShoe').get();
router.route('/getShoesByCategories').get();
router.route('/createNewShoe').post();
router.route('/searchShoes').get();

module.exports = router;
