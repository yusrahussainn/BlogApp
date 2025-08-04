import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    list: [],
    originalList: [],
  },
  reducers: {
    setBlogs: (state, action) => {
      state.list = action.payload;
      state.originalList = action.payload;
    },
    filterBlogs: (state, action) => {
      const filtered = action.payload;
      state.list = filtered.length ? filtered : state.originalList;
    },
  },
});

export const { setBlogs, filterBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;
