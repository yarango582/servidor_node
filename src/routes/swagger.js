import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const router = express.Router();

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocument));


export default router;