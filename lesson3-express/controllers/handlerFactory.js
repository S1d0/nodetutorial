const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/apiError");
const APIFeatures = require("./../apiFeature");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Hack to make nested query possible in reviewController
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    const apiFeatures = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const docs = await apiFeatures.query;

    res.status(200).json({
      status: "success",
      length: docs.length,
      data: {
        docs,
      },
    });
  });
