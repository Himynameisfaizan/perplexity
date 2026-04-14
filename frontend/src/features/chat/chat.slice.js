import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    error: null,
    isLoading: false,
  },

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setChats, setCurrentChatId, setError, setIsLoading } =
  chatSlice.actions;
export default chatSlice.reducer;
