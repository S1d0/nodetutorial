const express = require("express");
const morgan = require("morgan");
const app = express();
const AppError = require("./utils/apiError");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const globalErroHandler = require("./controllers/errorController");

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Not found path ${req.originalUrl}`, 404));
});

app.use(globalErroHandler);

module.exports = app;
