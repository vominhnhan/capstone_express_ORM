import express from "express";
import imageController from "../controllers/image.controller.js";
import { protect } from "../middleware/protect.middleware.js";
import uploadCloud from "../common/multer/upload-cloud.multer.js";

const imageRouter = express.Router();

imageRouter.get("/getDetailImage/:id", imageController.getDetailImage);
imageRouter.get(
  "/getCommentByIdImage/:id",
  imageController.getCommentByIdImage
);
imageRouter.get("/checkSaveImage/:id", protect, imageController.chekSaveImage);
imageRouter.post("/commentImage/:id", protect, imageController.commentImage);

imageRouter.get(`/getSavedImage`, protect, imageController.getSavedImage);
imageRouter.get(`/getCreatedImage`, protect, imageController.getCreatedImage);
imageRouter.delete(`/delete/:id`, protect, imageController.deleteImage);
imageRouter.post(
  `/add`,
  protect,
  uploadCloud.single("image"),
  imageController.addImage
);

export default imageRouter;
