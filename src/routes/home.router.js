import express from "express";
import homeController from "../controllers/home.controller.js";

const homeRouter = express.Router();

homeRouter.get(`/getImages`, homeController.getImages);

homeRouter.get(`/getImageByName`, homeController.getImageByName);

export default homeRouter;
