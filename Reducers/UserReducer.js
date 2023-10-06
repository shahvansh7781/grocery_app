import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "../utils/api_url";

export const loadUser = createAsyncThunk("users/loadUser", async (e) => {
  // console.log(email);
  // console.log(e);

});

const userSlice = createSlice({
  name: "users",
  initialState: { user: null },
  reducers: {
    getUser(state,action){
        state.user = {...action.payload};
        // console.log(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {getUser} = userSlice.actions;
export default userSlice.reducer;
