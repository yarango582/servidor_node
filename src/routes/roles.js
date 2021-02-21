import express from "express";
import {createRole, createRoleForUser} from "../controllers/roles";

const router = express.Router();

router.post("/api/v1/roles", createRole);
router.post("/api/v1/roles/:roleID", createRoleForUser);

export default router;
