import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "../utils/api_url";

export const loginUser = createAsyncThunk("users/loginUser", async (e) => {
  // console.log(email);
  // console.log(e);
  try {
    const response = await axios.post(
      `${api_url}:8082/myapp/login`,
      {
        email:e.email,
        password:e.password
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    // const data = await response.json();
    // console.log(data);
    // console.log(response.data.userDetails);
    return response.data.userDetails;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: { user: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
