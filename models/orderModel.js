// order schema: color, size, number of pieces, address, user phone number, VAT, final price
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  color: {
    type: String,
  },
  size: {
    type: Number,
  },
  Quantity: {
    type: Number,
    default: 1,
  },
  tax: {
    type: Number,
    default: 7.5,
  },
  userPhoneNumber: {
    type: Number,
    required: [
      true,
      'Please provide Your phone or signup and provide your number',
    ],
  },
  userId: {
    type: String,
    required: [true, 'ID of the user making the order is requiered'],
  },
  userEmail: {
    type: String,
    required: [true, 'Your E-mail address is required to file your order'],
  },
  userAddress: {
    type: String,
    required: [
      true,
      ' Provide your addres for your delivery or change your address if you want it deliverd else where',
    ],
  },
  deliveryFee: {
    type: Number,
  },
  coupon: {
    type: String,
  },
  finalPrice: {
    type: Number,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shoe',
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  trackinId: {
    type: String,
    required: [true, 'Your order has to trcking id'],
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
