import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import blogsReducer from './blogsSlice';
import favouritesReducer from './favouritesSlice';
import shareReducer from './shareSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    blogs: blogsReducer,
    favourites: favouritesReducer,
    share: shareReducer,
  },
});
