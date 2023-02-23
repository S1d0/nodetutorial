const Review = require("./../models/reviewModel");
const handlerFactory = require("./handlerFactory");

/*
  Middleware
*/
exports.setTourAndUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.param.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = handlerFactory.getAll(Review)
exports.getReview = handlerFactory.getOne(Review, {
  path: "users",
  select: "name photo",
});
exports.createReview = handlerFactory.create(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
