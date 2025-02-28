import express from "express";
import imageController from "../controllers/image.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get(`/getImages`, imageController.getImages);
imageRouter.get(`/getImageByName`, imageController.getImageByName);
imageRouter.get("/getDetailImage/:id", imageController.getDetailImage);
imageRouter.get("/checkSaveImage/:id", protect, imageController.chekSaveImage);

export default imageRouter;
