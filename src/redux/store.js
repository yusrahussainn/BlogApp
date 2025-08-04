import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import blogsReducer from './blogsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    blogs: blogsReducer,
  },
});
