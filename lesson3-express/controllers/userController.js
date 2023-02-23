const User = require("./../models/userModel");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User)
exports.getUser = handlerFactory.getOne(User)

exports.updateUser = (req, res) => {
  res.status(200);
};

exports.deleteUser = handlerFactory.deleteOne(User);
