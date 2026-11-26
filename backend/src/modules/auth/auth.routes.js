import express from "express";
const router = express.Router();

import { signup, getUsers } from "./auth.controller.js";

router.post("/users", signup);
router.get("/users", getUsers);

export default router;
