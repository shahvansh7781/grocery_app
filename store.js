import { configureStore } from "@reduxjs/toolkit";
import GroceryReducer from "./Reducers/GroceryReducer";
import CartReducers from "./Reducers/CartReducers";
import UserReducer from "./Reducers/UserReducer";
import AddressReducer from "./Reducers/AddressReducer";

export const store = configureStore({
    reducer:{
        groceries:GroceryReducer,
        Cart:CartReducers,
        users:UserReducer,
        Address:AddressReducer
    }
})