import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import homeRouter from "./home.router.js";
import imageRouter from "./image.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json(`Welcome`);
});

rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/home`, homeRouter);
rootRouter.use(`/user`, userRouter);
rootRouter.use(`/image`,imageRouter)

export default rootRouter;