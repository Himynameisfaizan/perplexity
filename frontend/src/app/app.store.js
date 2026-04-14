import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import chatUiReducer from "../features/chat/chat.ui.slice";
import chatReducers from "../features/chat/chat.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatUi: chatUiReducer,
    chat: chatReducers,
  },
});
