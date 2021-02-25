import express from "express";
import {getUsers} from "../controllers/users";
import {validateJWT} from "../middlewares/jwt";

const router = express.Router();

router.get("/api/v1/users", validateJWT, getUsers);

export default router;
