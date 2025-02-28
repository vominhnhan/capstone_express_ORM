import express from "express";
import userController from "../controllers/user.controller.js";
import { protect } from "../middleware/protect.middleware.js";
import uploadCloud from "../common/multer/upload-cloud.multer.js";

const userRouter = express.Router();

userRouter.get("/get-info", protect, userController.getInfo);
userRouter.put(
  "/editUserInfo",
  protect,
  uploadCloud.single("avatar"),
  userController.editUserInfo
);

userRouter.get(`/get-saved-images`, protect, userController.getSavedImages);
userRouter.get(`/get-created-images`, protect, userController.getCreatedImages);
userRouter.delete(`/delete-image/:id`, protect, userController.deleteImage);
userRouter.post(
  `/add-image`,
  protect,
  uploadCloud.single("image"),
  userController.addImage
);

export default userRouter;
