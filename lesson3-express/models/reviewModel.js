const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    rating: Number,
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
