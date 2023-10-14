import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "../utils/api_url";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Admin/config";

const dbRef = collection(db, "Users");
let v = null;
export const loadUser = createAsyncThunk("users/loadUser", async (e) => {
  // console.log(email);
  console.log("param",e);
  try {
    
    const response = await axios.get(`${api_url}:8082/myapp/getAllUsers`,{
      headers: { "Content-Type": "application/json" },
    });
    const usersRed = response.data.users;
    const userProfile = usersRed.filter(user => user.email === e);
    // console.log(response.data.orders);
console.log(userProfile[0])
    return userProfile[0];
   
  } catch (error) {
    throw error;
  }
  // try {
  //   const q = query(dbRef, where("email", "==", `${e}`));
  //   getDocs(q)
  //     .then((d) => {
  //       d.forEach((doc) => {
  //         // console.log("doc:",doc.data());
  //         v = { ...doc.data(), id: doc.id };
  //         // console.log("v:",v);
  //       });
  //     })
   
  //       console.log("v usereducer:", v);
  //       return v;
   
  // } catch (error) {}
});



export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(`${api_url}:8082/myapp/getAllUsers`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = response.data.users;

    console.log(data);

    return data;
   
  } catch (error) {
    throw error;
  }
});


const userSlice = createSlice({
  name: "users",
  initialState: {data:[], user: null, userProfile: null },
  reducers: {
    getUser(state, action) {
      state.user = { ...action.payload };
      // console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = {...action.payload};
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
