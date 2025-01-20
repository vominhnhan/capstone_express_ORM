import express from "express";
import rootRouter from "./src/routes/root.router.js";

const app = express();
const port = 3000;

app.use(rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
