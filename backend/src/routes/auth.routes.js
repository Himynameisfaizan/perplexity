import express from "express";
import { getMe, userLogin, userRegister } from "../controllers/auth.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
const authRouter = express.Router()

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.get("/get-me", identifyUser, getMe);


export default authRouter