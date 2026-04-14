import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  isMobile: false,
};

const chatUiSlice = createSlice({
  name: 'chatUi',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setIsMobile } = chatUiSlice.actions;
export default chatUiSlice.reducer;
