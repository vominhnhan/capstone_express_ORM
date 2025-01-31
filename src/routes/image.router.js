import express from "express";
import imageCotroller from "../controllers/image.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/getDetailImage/:id", imageCotroller.getDetailImage);
imageRouter.get("/getCommentByIdImage/:id", imageCotroller.getCommentByIdImage);
imageRouter.get("/checkSaveImage/:id", protect, imageCotroller.chekSaveImage);
imageRouter.post("/commentImage/:id", protect, imageCotroller.commentImage);

imageRouter.get(`/getSavedImage`, protect, imageCotroller.getSavedImage);
imageRouter.get(`/getCreatedImage`, protect, imageCotroller.getCreatedImage);
imageRouter.delete(`/delete/:id`, protect, imageCotroller.deleteImage);
imageRouter.post(`/add`, protect, imageCotroller.addImage);

export default imageRouter;
