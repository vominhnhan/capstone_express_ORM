import express from "express";
import imageCotroller from "../controllers/image.controller.js";

const imageRouter = express.Router();

imageRouter.get('/getDetailImage/:id',imageCotroller.getDetailImage)
imageRouter.get('/getCommentByIdImage/:id',imageCotroller.getCommentByIdImage)

export default imageRouter