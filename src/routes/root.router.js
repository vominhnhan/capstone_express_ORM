import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import commentRouter from "./comment.router.js";
import imageRouter from "./image.router.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json(`Welcome`);
});

rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/comment`, commentRouter);
rootRouter.use(`/user`, userRouter);
rootRouter.use(`/image`,imageRouter)

export default rootRouter;