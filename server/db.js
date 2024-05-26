import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Connect = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log("Error while connecting to database: " + error);
    });
};
export default Connect;