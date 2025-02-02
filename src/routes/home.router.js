import express from "express";
import homeController from "../controllers/home.controller.js";

const homeRouter = express.Router();

homeRouter.get(`/getImages`, homeController.getImages);

homeRouter.get(`/getDetailImg/:id`, homeController.getDetailImage);

export default homeRouter;
