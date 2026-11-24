// connect with db
import mongoose from "mongoose";

const connect = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/appdb");
        console.log("Connected");
    } catch(error) {
        console.log("Error while connection", error);
    }
};

export default connect;