// the database will be connected here , and the url will be local mongodb storage used instead of cloud storage for this practice project.

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database Connection Error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
