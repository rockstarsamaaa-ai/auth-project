const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Keep MongoDB indexes aligned with the current schema so removed
    // fields like `phone` do not leave stale unique indexes behind.
    const User = require("../models/User");
    await User.syncIndexes();

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
