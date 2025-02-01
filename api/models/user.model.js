import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
  },
  //it's necessary to get the time of creating and time of updating user
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
