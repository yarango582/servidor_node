import express from "express";
import {getUsers} from "../controllers/users";
import {validateJWT} from "../middlewares/jwt";
import { getRole } from "../middlewares/permissions";

const router = express.Router();

router.get("/api/v1/users", validateJWT, getUsers);

export default router;
