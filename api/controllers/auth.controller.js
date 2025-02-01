import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // 1) getting request body
  const { username, email, password } = req.body;
  // 2) Checking if data is correct
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  // 3) Hashing the password
  const hashedPassword = bcryptjs.hashSync(password, 12);

  // 4) Craete a new user using the User model
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // 5) Save the new user to database
    await newUser.save();

    // 6) Sending a feedback to the user that signing-up process is done
    res.json("signup is successful");
  } catch (error) {
    // 7) Handle the error
    next(error);
  }
};
