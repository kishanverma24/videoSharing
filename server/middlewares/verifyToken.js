import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) return next(createError(401, "You are not authenticated!"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded.username) {
      return next(createError(403, "Token is not valid!"));
    }
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      return res.status(500).json("User not found!");
    }
    req.username = user.username;
    next();
  } catch (err) {
    return next(createError(403, "Token is not valid!"));
  }
};
