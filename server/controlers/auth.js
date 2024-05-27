import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { username, fullname, email, userpassword } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User with provided email or username already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(userpassword, 10);
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User has been created successfully.", success: true });
  } catch (err) {
    console.error("Error while signing up:", err);
    res.status(500).json({ message: "Error while signing up", success: false });
  }
};

export const signin = async (req, res) => {
  try {
    const { loginusername, loginuserpassword } = req.body;

    // Check if username and password are provided
    if (!loginusername || !loginuserpassword) {
      return res.status(400).json({
        message: "Username and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ username:loginusername });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const validPassword = await bcrypt.compare(loginuserpassword, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_TOKEN);

    const { password, ...loginUser } = user._doc;

    res.cookie("access_token", token, { httpOnly: true });

    res.status(200).json({ user: loginUser, token, success: true });
  } catch (err) {
    console.error("Error while signing in:", err);
    res.status(500).json({ message: "Error while signing in", success: false });
  }
};
