// connect with db
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  try {
    //mongoose.connect("mongodb://localhost:27017/appdb");
    mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected");
  } catch (error) {
    console.log("Error while connection", error);
  }
};

export default connect;
