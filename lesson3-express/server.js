const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection succesful!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runninng on Port: ${port}`);
});
