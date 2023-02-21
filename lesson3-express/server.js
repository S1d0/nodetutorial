const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DB;
const DB_LOCALHOST = process.env.DB_LOCALHOST;

mongoose
  .connect(DB_LOCALHOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection succesful!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runninng on Port: ${port}`);
});
