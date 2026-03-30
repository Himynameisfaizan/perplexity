import { Router } from "express";
import {
  deleteChat,
  getChat,
  getMessage,
  sendMessage,
} from "../controllers/chat.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
const chatRouter = Router();

chatRouter.post("/message", identifyUser, sendMessage);
chatRouter.get("/message", identifyUser, getChat);
chatRouter.get("/message/:chatId", identifyUser, getMessage);
chatRouter.delete("/message/:chatId", identifyUser, deleteChat);

export default chatRouter;
