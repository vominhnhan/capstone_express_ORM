import express from "express";
import imageCotroller from "../controllers/image.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/getDetailImage/:id", imageCotroller.getDetailImage);

imageRouter.get(
  `/getSavedImage/:id`,
  protect,
  imageCotroller.getSavedImagesByUserId
);

export default imageRouter;
