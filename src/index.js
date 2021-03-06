import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import rolesRouter from "./routes/roles";
import swaggerRouter from "./routes/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(authRouter);
app.use(userRouter);
app.use(rolesRouter);
app.use(swaggerRouter);


export default app;