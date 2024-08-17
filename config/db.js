const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`COnnect to mongo db database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("MongoDb Error", error);
  }
};

module.exports = connectDB;
