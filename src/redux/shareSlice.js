import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailjs from "emailjs-com";

export const shareBlogByEmail = createAsyncThunk(
  "share/shareBlogByEmail",
  async ({ blog, email }, thunkAPI) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          title: blog.title,
          content: blog.content,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      return { email, blog };
    } catch (error) {
      console.error("Error sharing blog:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const shareSlice = createSlice({
  name: "share",
  initialState: {
    status: "idle",
    error: null,
    lastShared: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shareBlogByEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(shareBlogByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastShared = action.payload;
      })
      .addCase(shareBlogByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default shareSlice.reducer;
