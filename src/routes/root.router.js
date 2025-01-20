import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json(`Welcome`);
});

export default rootRouter;
