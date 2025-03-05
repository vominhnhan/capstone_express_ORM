import express from "express";
import commentController from "../controllers/comments.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const commentRouter = express.Router();

commentRouter.get(`/getCommentByIdImage/:id`, protect, commentController.getCommentByIdImage);

commentRouter.post(`/commentImage/:id`, protect, commentController.commentImage);


export default commentRouter;