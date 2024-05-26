import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
} from "../controlers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//update user
router.put("/updateuser/:userid", verifyToken, updateUser);

//delete user
router.delete("/deleteuser/:userid", verifyToken, deleteUser);

//get a user
router.get("/user/:userid",verifyToken, getUser);

//subscribe a user
router.put("/subscribeuser/:userid", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsubscribeuser/:userid", verifyToken, unsubscribe);

// _______________________________________________________________________________________________________



export default router;
