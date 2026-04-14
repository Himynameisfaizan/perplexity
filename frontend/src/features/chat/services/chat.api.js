import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/chats",
  withCredentials: true,
});

export const sendMessage = async ({ message, chatId }) => {
  const response = await api.post("/messsage", {
    message,
    chatId,
  });

  return response.data;
};

export const getChat = async () => {
  const response = await api.get("/message");

  return response.data;
};

export const getMessage = async (chatId) => {
  const response = await api.get(`/message/${chatId}`);
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await api.delete(`/message/${chatId}`);
  return response.data;
};
