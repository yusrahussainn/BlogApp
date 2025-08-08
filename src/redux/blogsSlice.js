import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";


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

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async ({ title, content, author }, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        likes: 0,
        createdAt: serverTimestamp(),
      });
      return {
        id: docRef.id,
        title,
        content,
        author,
        likes: 0,
        createdAt: new Date(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      const term = action.payload.toLowerCase();
      state.list = state.originalList.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term)
    );
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
      })
      .addCase(createBlog.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.originalList.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
      state.error = action.payload;
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
