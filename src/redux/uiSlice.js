import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false,
    isProfileModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openProfileModal: (state) => {
      state.isProfileModalOpen = true;
    },
    closeProfileModal: (state) => {
      state.isProfileModalOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openProfileModal,
  closeProfileModal,
} = uiSlice.actions;

export default uiSlice.reducer;
