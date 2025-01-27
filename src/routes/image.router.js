import express from "express";
import { protect } from "../middleware/protect.middleware.js";
import imageController from "../controllers/image.controller.js";

const imageRouter = express.Router();

imageRouter.get("/getDetailImage/:id", imageController.getDetailImage);

imageRouter.get(
  `/getSaveImage/:id`,
  protect,
  imageController.getSaveImageByUserId
);

export default imageRouter;
