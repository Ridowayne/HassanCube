const mongoose = require('mongoose');
const slugify = require('slugify');

// shoe schema: age group, gender, footware type, material type, price, material, reviewsand rating,

const shoeSchema = new mongoose.Schema({
  shoeName: {
    type: String,
    required: [true, 'kindly provide a name for this shoe'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    minlength: [10, 'A tour name must have more or equal then 10 characters'],
  },
  photo: [String],
  slug: String,
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  shoeType: {
    type: String,
    required: [true, 'please provide the type of shoe it is'],
    enum: ['Halfshoe', 'Sandal', 'Shoe', 'Slippers'],
  },
  ageGroup: {
    type: String,
    enum: ['Adults', 'Kids', 'Available for All'],
    default: 'Available for All',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: [true, 'Please provide the gender'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  shoedescription: {
    type: String,
    required: [true, 'kindly decribe the new shoe you are abot to create'],
  },
  price: {
    type: Number,
    required: [true, 'please provide the price of shoe'],
  },
  discount: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'please provide Image for the new shoe'],
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Rating',
    },
  ],
  tags: {
    type: String,
    required: [
      true,
      'please provide tags for this shoe for easy searching and visibility',
    ],
    default: 'shoes',
    //   enum: []
  },
  weight: {
    type: Number,
  },
  dimension: {
    type: Number,
  },
  materials: {
    type: String,
    required: [true, 'please provide materials ussed for this product'],
  },
  contactInfo: {
    type: String,
    //   default:
  },
  //   {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true }
  //   }
});

shoeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'shoe',
  localField: '_id',
});

shoeSchema.pre('save', function (next) {
  this.slug = slugify(this.shoeName, { lower: true });
  next();
});

const Shoe = mongoose.Model('shoe', shoeSchema);

module.exports = Shoe;
