const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authenticationController");

// mergeParams to get parameters from tourRouter tourId
// POST /tour/23412/reviews
const router = express.Router({mergeParams: true});

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourAndUserId,
    reviewController.createReview
  )
  
router.route("/:id")
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview);
  
module.exports = router;
