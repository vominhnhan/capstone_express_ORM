import express from "express";
import rootRouter from "./src/routes/root.router.js";
import { handleError } from "./src/common/helpers/error.helper.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(rootRouter);

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
