import express from "express";
const app = express();
import dbConnect from "./config/database.js";
dbConnect();

app.use(express.json());

import userRouter from "./modules/auth/auth.routes.js";

app.use("/api", userRouter);

app.listen(5000, () => {
  console.log(`Server is listening`);
});
