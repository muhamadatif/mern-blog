import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
  const hashedPassword = bcryptjs.hashSync(password, 8);

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
      // {expiresIn:"1d"}
    );

    // To extract the password from the user object
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true }) // httpOnly property mean that the token can only  be modefied by the server
      .json(rest);
  } catch (error) {
    next(error);
  }
};
