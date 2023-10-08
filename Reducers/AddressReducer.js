import { createSlice } from "@reduxjs/toolkit";


const AddressSlice = createSlice({
  name: "Address",
  initialState:{
    coords: {}, // Initial coords value
    address: '', // Initial address value
  },
 
  reducers: {
    // addAddress: (state, action) => {
    //   state.push(action.payload);
    // },
    updateCoor: (state, action) => {
        state.coords = action.payload.coords;
       
      },
    updateAddress: (state, action) => {
        console.log('i am in update')
        state.address = action.payload.address;

        console.log('state',state)
      },
   



    // deleteAllAddress: (state) => {
    //   // Set the state to an empty array to remove all items
    //   state.splice(0, state.length);
    // },

   
  },
});

export const {addAddress} = AddressSlice.actions;
export const {updateAddress,updateCoor} = AddressSlice.actions;
export default AddressSlice.reducer;
