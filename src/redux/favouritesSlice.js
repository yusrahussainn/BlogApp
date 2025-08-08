import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addToFavourites = createAsyncThunk(
  "favourites/addToFavourites",
  async (blog, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "favourites"), {
        blogId: blog.id,
        title: blog.title,
        author: blog.author,
      });
      return { ...blog, docId: docRef.id };
    } catch (error) {
      console.error("Error adding to favourites:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavourites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default favouritesSlice.reducer;
