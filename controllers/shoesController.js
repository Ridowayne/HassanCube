const { TokenExpiredError } = require('jsonwebtoken');
const Shoe = require('../models/shoesModel');

exports.allShoes = async (req, res) => {
  try {
    const Shoes = await Shoe.find({}).limit(req.params.limit).sort();
    return res.status(200).json({
      status: 'success',
      message: 'Shoes fetched successfully',
      data: Shoes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};
exports.oneShoe = async (req, res, next) => {
  try {
    const aShoe = await Shoe.findOne({ id: req.params.id }).populate('Reviews');
    return res.status(200).json({
      status: 'success',
      message: 'Shoe fetched successfully',
      data: aShoe,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.findShoeBasedCategory = async (req, res, next) => {
  try {
    const query = req.query;
    const search = await Shoe.find(query);
    return res.status(200).json({
      status: 'success',
      message: 'Shoes fetched successfully',
      data: search,
    });
  } catch (error) {
    return next(error);
  }
};
