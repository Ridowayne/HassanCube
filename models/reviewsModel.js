const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [
      true,
      'Kindly leave a comment so we can hear more about how we are doing',
    ],
  },
  rating: {
    type: Number,
    required: [true, 'Kindly give a rating to help us serve you better'],
    min: [1, 'Rating can not be less than 1'],
    max: [5, 'Rating can not be higher than 5'],
  },
  shoeID: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Shoe',
    },
  ],
});

const Rating = mongoose.model('Rating', reviewSchema);

module.exports = Rating;
