import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auths.js";
import userRoutes from "./routes/users.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
     })
     .catch((err) => {
        throw err;
     });
}


const corsOptions = {
    origin: true, // or your frontend origin
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(8000, () => {
    connect();
    console.log("Server is running on port 8000");
});