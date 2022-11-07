const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
// user schema: name, country and state, street address, city, phone number, email address, password

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'kindly provide us with your name'],
  },
  emailAddress: {
    type: String,
    required: [true, 'kindly provide your email address'],
    unique: true,
    validate: [validator.isEmail],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'kindly provide your phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please create a password for security'],
  },
  role: {
    type: String,
    enum: ['Me', 'Seller', 'Customer'],
    default: 'Customer',
  },
  country: {
    type: String,
    required: [true, 'kindly provide the name of your country of residence'],
  },
  state: {
    type: String,
    required: [true, 'kindly provide the name of your state of residence'],
  },
  city: {
    type: String,
    required: [true, 'kindly provide the name of your city of residence'],
  },
  streetAddress: {
    type: String,
    required: [true, 'kindly provide the name of your street'],
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
