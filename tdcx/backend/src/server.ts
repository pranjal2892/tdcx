import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose, { startSession } from "mongoose";
import rateLimit from 'express-rate-limit'
import userRoutes, { route } from "./routes/User";
import taskRoutes from "./routes/Task";
import cors from "cors";
const router = express();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    `<h1 style='display:flex; align-items:center; justify-content:center; height:100vh'>
     429 - Too many Requests <br> Try again later!
    </h1>`,
})

mongoose
  .connect(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  });

const StartServer = () => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(cors());
  router.use(limiter);
  
  //Rules of API

  router.use("/users", userRoutes);
  router.use("/tasks", taskRoutes);

  router.use((req, res, next) => {
    const error = new Error("Url Not Found");
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      console.log(`server is running at port ${config.server.port}`)
    );
};
