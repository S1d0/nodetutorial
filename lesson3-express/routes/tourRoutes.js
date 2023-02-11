const express = require("express");
const router = express.Router();
const tourController = require("./../controllers/tourController");

router
  .route("/")
  .get(tourController.getAllTours)
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
  .delete(tourController.deleteTour);

// statistics

module.exports = router;
