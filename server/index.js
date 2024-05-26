import express from "express"
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import videoRouter from "./routes/videos.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connect from "./db.js"
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};
app.use(cors(corsOptions));

//middlewares
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comments", commentRouter);

//error handler
app.use((err, req, res,next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  Connect();
  console.log("Connected to Server");
});
