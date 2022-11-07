const Order = require('../models/orderModel');

exports.makeOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    return res.status(200).json({
      status: 'success',
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOneOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({id: req.params.id}).populate('user');
    return res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      status: 'success',
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    return res.status(200).json({
      status: 'success',
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ sellerId: req.user.id });
    return res.status(200).json({
      status: 'success',
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};
