import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: { type: Number },
  city: { type: String },
  salary: { type: Number },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  createdAt: { type: Date, immutable: true, default: Date.now },
  updatedAt: { type: Date },
});

// Add indexes...

export default mongoose.model("user", userSchema);
