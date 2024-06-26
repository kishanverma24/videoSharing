import express from "express";
import {signin,signup,signout} from "../controlers/auth.js"
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    await signup(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error while signing up", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    await signin(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error while signing in", error: error.message });
  }
});
router.post("/signout", async (req, res) => {
  try {
    await signout(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error while signing out", error: error.message });
  }
});

export default router;
