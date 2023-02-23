const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authenticationController");
const reviewRouter = require("./reviewRoutes")

const router = express.Router();

// Mounting diffrent router 
router.use("/:tourId/reviews", reviewRouter)

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

// Allias
router
  .route("/top-5-cheap")
  .get(tourController.topFiveAllias, tourController.getAllTours);

router.route("/tour-stat").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
