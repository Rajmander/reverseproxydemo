import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: Number,
  city: String,
  salary: Number,
  status: {
    type: Boolean,
    default: true,
  },
  add_date: { type: Date, immutable: true, default: Date.now },
  updatedDate: { type: Date },
});

export default mongoose.model("user", userSchema);
