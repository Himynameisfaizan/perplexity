import { generateResponse, generateTitleChat } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title = null,
    chat = null;

  if (!chatId) {
    title = await generateTitleChat(message);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id });

  const result = await generateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    title,
    chat,
    aiMessage,
  });
}

export async function getChat(req, res) {
  const userId = req.user.id;

  const chat = await chatModel.find({ user: userId });

  res.status(200).json({
    message: "Chat fetched successfully",
    chat,
  });
}

export async function getMessage(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    res.status(404).json({
      message: "Chat not found by this id",
    });
  }

  const message = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Your messages fetched successfully",
    message,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    res.status(404).json({
      message: "User not found",
    });
  }

  await messageModel.deleteMany({
    chat: chatId,
  });

  res.status(200).json({
    message: "This chat is deleted successfully",
  });
}
