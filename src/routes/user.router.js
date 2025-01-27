import express from "express";
import userController from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const userRouter = express.Router();

userRouter.get("/:id", protect, userController.getUserById);

userRouter.get(`/:id/images`, protect, userController.getImagesByUserId);

export default userRouter;
