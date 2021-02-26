import express from "express";
import {signUp, login, resetPassword, updatePassword} from "../controllers/auth";

const router = express.Router();

router.post("/api/v1/login", (req, res, next) => login(req, res, next));
router.post("/api/v1/signup", signUp);
router.post("/api/v1/reset-password", resetPassword);
router.put("/api/v1/users/:userID/update-password", updatePassword);

export default router;

