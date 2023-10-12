import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; // Import Axios
import { api_url } from "../utils/api_url";

// Define an async thunk for fetching groceries using Axios
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get(`${api_url}:8082/myapp/getAllOrders`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = response.data.orders;

    // console.log(response.data.orders);

    return data;
   
  } catch (error) {
    throw error;
  }
});



// Create a slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: { data: [],myOrdersLength:0,walletCoins:0 },
  reducers: {
    getMyOrdersLength(state,action){
state.myOrdersLength=action.payload
    },
    getWalletCoins(state,action){
      state.walletCoins=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
  },
});

// export const { deletee } = groceriesSlice.actions;
export const {getWalletCoins} = ordersSlice.actions;
export default ordersSlice.reducer;
