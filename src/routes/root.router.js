import express from "express";
import authRouter from "./auth.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json(`Welcome`);
});

rootRouter.use(`/auth`, authRouter);

export default rootRouter;
