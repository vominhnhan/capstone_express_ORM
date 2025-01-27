import express from "express";
import userController from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const userRouter = express.Router();

userRouter.get("/getInfo", protect, userController.getInfo);

export default userRouter;
