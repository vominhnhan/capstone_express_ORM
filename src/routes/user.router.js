import express from "express";
import userController from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.middleware.js";
import uploadCloud from "../common/multer/upload-cloud.multer.js";

const userRouter = express.Router();

userRouter.get("/getInfo", protect, userController.getInfo);
userRouter.put("/editUserInfo", protect, uploadCloud.single("avatar"), userController.editUserInfo)

export default userRouter;
