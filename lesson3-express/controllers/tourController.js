const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");
const handlerFactory = require("./handlerFactory");
const APIFeatures = require("./../apiFeature");

exports.topFiveAllias = (req, rest, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage,price";
  req.query.fields =
    "name,ratingsAverage,price,duration,summary,description,difficulty";
  next();
};

exports.getAllTours = handlerFactory.getAll(Tour);

exports.getTour = handlerFactory.getOne(Tour);

exports.createTour = handlerFactory.create(Tour);

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = handlerFactory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate(
    [
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ],
    () => {}
  );
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plans = await Tour.aggregate(
    [
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numOfTourStart: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
    ],
    () => {}
  );
  res.status(200).json({
    status: "success",
    data: {
      plans,
    },
  });
});
