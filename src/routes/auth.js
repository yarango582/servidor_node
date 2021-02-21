import express from "express";
import {signUp, login} from "../controllers/auth";

const router = express.Router();

router.get("/api/v1/login", (req, res, next) => login(req, res, next));
router.post("/api/v1/signup", signUp);

export default router;

