const Review = require('../models/reviewsModel');

exports.readReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({}).populate('User');
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newRevew = await Review.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: newRevew,
    });
  } catch (error) {
    return next(error);
  }
};
