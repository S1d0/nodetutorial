const { query } = require("express");
const AppError = require("../utils/apiError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUser = handlerFactory.getOne(User)

exports.updateUser = (req, res) => {
  res.status(200);
};

exports.deleteUser = handlerFactory.deleteOne(User);
