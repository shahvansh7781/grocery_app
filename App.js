import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { configureStore } from "@reduxjs/toolkit";
import GroceryReducer from './Reducers/GroceryReducer';
import { Provider } from 'react-redux';
import CartReducer from './Reducers/CartReducers';

import 'react-native-gesture-handler';

LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead'])
export default function App() {
 
  const store = configureStore({
    reducer: {
      groceries: GroceryReducer,
      Cart:CartReducer
      // Add other reducers as needed
    },
  });
  
 
  
  
  
  return (
    <Provider store={store}>
       <AppNavigation ></AppNavigation> 
    </Provider>
     
    
   
  )
}
