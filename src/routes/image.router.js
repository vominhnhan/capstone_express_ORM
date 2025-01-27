import express from "express";
import imageCotroller from "../controllers/image.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/getDetailImage/:id", imageCotroller.getDetailImage);

export default imageRouter;
