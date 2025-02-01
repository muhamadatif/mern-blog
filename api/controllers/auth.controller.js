import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
  }

  // 3) Hashing the password
  const hashedPassword = bcryptjs.hashSync(password, 18);

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
    res.status(500).json({ message: error.message });
  }
};
