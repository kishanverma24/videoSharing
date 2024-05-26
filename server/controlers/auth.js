import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User with provided email or username already exists",
        success: false,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User has been created successfully." });
  } catch (err) {
    console.error("Error while signing up:", err);
    res.status(500).json({ message: "Error while signing up", success: false });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isPasswordCorrect = bcrypt.compare(userpassword, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Wrong Credentials", success: false });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_TOKEN);
    const { password, ...loginUser } = user._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json({ user: loginUser, token });
  } catch (err) {
    console.error("Error while signing in:", err);
    res.status(500).json({ message: "Error while signing in", success: false });
  }
};
