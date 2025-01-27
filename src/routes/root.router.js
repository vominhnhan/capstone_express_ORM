import express from "express";
import authRouter from "./auth.router.js";
import homeRouter from "./home.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json(`Welcome`);
});

rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/home`, homeRouter);

export default rootRouter;
