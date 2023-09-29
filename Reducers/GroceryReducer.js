import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; // Import Axios
import { api_url } from "../utils/api_url";

// Define an async thunk for fetching groceries using Axios
export const fetchGroceries = createAsyncThunk("groceries/fetchGroceries", async () => {
  try {
    const response = await axios.get(`${api_url}:8082/myapp/getGrocery`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = response.data.grocery;

    // console.log(data);

    return data;
   
  } catch (error) {
    throw error;
  }
});

// Define an async thunk for deleting groceries using Axios
export const deleteGroceries = createAsyncThunk("groceries/deleteGroceries", async (itemKey) => {
  try {
    const response = await axios.delete(`${api_url}:8082/myapp/deleteGrocery`, {
      headers: { "Content-Type": "application/json" },
      data: { itemKey }, // Use 'data' for DELETE requests in Axios
    });
    
    if (response.status === 200) {
      return itemKey; // Return the deleted item's key for reducer
    } else {
      throw new Error("Deletion failed");
    }
  } catch (error) {
    throw error;
  }
});

// Define an async thunk for editing groceries using Axios
export const editGroceries = createAsyncThunk("groceries/editGroceries", async (payload) => {
  try {
    const response = await axios.patch(`${api_url}:8082/myapp/editGrocery`, JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" },
    });
    const items = response.data;
    console.log(items);
  } catch (error) {
    throw error;
  }
});

// Define an async thunk for adding groceries using Axios
export const addGroceries = createAsyncThunk("groceries/addGroceries", async (payload) => {
  try {
    const response = await axios.post(`${api_url}:8082/myapp/addGrocery`, JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" },
    });
    console.log(await response.data);
    // Handle success and navigation here if needed
  } catch (error) {
    throw error;
  }
});

// Create a slice
const groceriesSlice = createSlice({
  name: "groceries",
  initialState: { data: [] },
  reducers: {
    //   deletee:(state,action)=>{
    //     console.log("Actionnn")
    //     const id=action.payload
    //     // deleteGroceries(id)
        
    //     state.data = state.data.filter((item) => item.id !== action.payload);
    //   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroceries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroceries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGroceries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGroceries.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { deletee } = groceriesSlice.actions;
export default groceriesSlice.reducer;
