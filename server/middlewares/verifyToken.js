import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Ensure the payload contains the username
    if (!decoded.username) {
      return next(createError(403, "Token is not valid!"));
    }

    // Find the user by username
    const user = await User.findOne({ username: decoded.username });

    // Check if the user exists
    if (!user) {
      return res.status(500).json("User not found!");
    }

    // Attach the user information to the request object
    req.username = user.username;
    // Proceed to the next middleware
    next();
  } catch (err) {
    return next(createError(403, "Token is not valid!"));
  }
};
