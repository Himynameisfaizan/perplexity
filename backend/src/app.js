import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { testAi } from "./services/ai.service.js";
testAi()

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
