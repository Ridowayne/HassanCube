const User = require('../models/userModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sendmail = require('../utils/sendmail');
const AppError = require('../utils/customError');

const userToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
  });
};

const createUserToken = (req, res, next) => {};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      streetAddress: req.body.streetAddress,
    });
    const emailExist = await User.findOne({ email: newUser.emailAddress });
    if (emailExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'An account already exist with this email address',
      });
    }
    await newUser.save();

    res.status(201).json({
      status: 'Success',
      user: newUser,
      token: token,
    });
    const token = await jwt.sign();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'unable to create user at the moment, Kindly try again later',
      error,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please provide Your valid E-mail and password to login',
      });
    }
    const returningUser = await User.findOne({ email: email });
    const isCorrectPassword = await bcrypt.compare(
      password,
      returningUser.password
    );

    if (!returningUser || !isCorrectPassword) {
      return res.status(401).json({
        status: 'Fail',
        message:
          'Incorrect password or email, Kindly confirm your details or create an account if you do not have an account yet',
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'User logged in',
      id: returningUser._id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Error logging in',
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please provide a valid email address',
      });
    }
    const lostAccount = await User.findOne({ email: email });
    if (!lostAccount) {
      return res.status(404).json({
        status: 'fail',
        message:
          'no user account found, Kindly confirm the email or Create an account if you do not have an account',
      });
    }
    const resetToken = lostAccount.createPasswordResetToken();
    await lostAccount.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetpassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;

    await sendmail({
      email: lostAccount.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'Success',
      message: 'Kindly check your mail and follow the instruction',
    });
  } catch (error) {
    console.log(error);
    lostAccount.passwordResetToken = undefined;
    lostAccount.passwordResetExpires = undefined;
    await lostAccount.save({ validateBeforeSave: false });

    res.status(400).json({
      status: 'Fail',
      message: 'Encountered an error please try again',
    });
  }
};

const protect = async (req, res) => {
  try {
    let token;
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      throw new AppError('Unauthorized', 401);
    }

    token = req.headers.authorization.replace('Bearer', '').trim();
    if (!token) {
      throw new AppError(
        'You are not logged in, Kindly log in to continue',
        401
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findOne({ id: decoded.id });
    if (!user) {
      return next(
        new ErrorResponse(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    req.user = user;
  } catch (err) {}
};

const restrictTo = (...designation) => {
  return (req, res, next) => {
    if (!designation.includes(req.user.designation)) {
      return next(
        new AppError('You do not have permission to performthis action', 403)
      );
    }
    next();
  };
};
