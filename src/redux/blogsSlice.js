import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

export const likeBlog = createAsyncThunk("blogs/likeBlog", async (blog) => {
  const blogRef = doc(db, "blogs", blog.id);
  const updatedLikes = (blog.likes || 0) + 1;
  await updateDoc(blogRef, { likes: updatedLikes });
  return { ...blog, likes: updatedLikes };
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    list: [],
    originalList: [],
    loading: false,
    error: null,
    selected: null,
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
    setSelectedBlog: (state, action) => {
      state.selected = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.originalList = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const index = state.list.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const {
  setBlogs,
  filterBlogs,
  setSelectedBlog,
  clearSelectedBlog,
} = blogsSlice.actions;

export default blogsSlice.reducer;
