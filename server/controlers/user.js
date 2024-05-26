import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const url = req.url;
  const parts = url.split("/");
  const profileid = parts[parts.length - 1];
  if (profileid === req.username) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { username: profileid },
        {
          $set: { fullname, email, password },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const profileid = parts[parts.length - 1];
  if (profileid === req.username) {
    try {
      await User.findOneAndDelete(req.username);
      return res.status(200).json("User has been deleted.");
    } catch (err) {
     return res.status(500).json({ "Error while deleting the user": err });
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const profileid = parts[parts.length - 1];
  try {
    const user = await User.find(profileid);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const profileid = parts[parts.length - 1];
  try {
    await User.findOneAndUpdate({username:profileid}, {
      $push: { subscribedUsers: req.username },
    });
    await User.findOneAndUpdate({username:profileid}, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const profileid = parts[parts.length - 1];
    try {
      await User.findOneAndUpdate({username:profileid}, {
        $pull: { subscribedUsers: req.username },
      });
      await User.findOneAndUpdate({username:profileid}, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.");
    } catch (err) {
      next(err);
    }
  
  };


