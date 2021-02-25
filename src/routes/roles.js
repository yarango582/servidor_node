import express from "express";
import {createRole, createRoleForUser} from "../controllers/roles";
import {validateJWT} from "../middlewares/jwt";

const router = express.Router();

router.post("/api/v1/roles", validateJWT, createRole);
router.post("/api/v1/users/:userID/roles/:roleID", validateJWT, createRoleForUser);

export default router;
