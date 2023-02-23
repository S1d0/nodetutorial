const { query } = require("express");
const AppError = require("../utils/apiError");
const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.setTourAndUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.param.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReview = handlerFactory.getOne(Review, {
  path: "users",
  select: "name photo",
});

exports.createReview = handlerFactory.create(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
