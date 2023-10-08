import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import { Cart } from "../screens/Cart";
import UserDetails from "../screens/UserDetails";
import DashBoard from "../Admin/Screens/DashBoard";
import { EditGrocery } from "../Admin/Screens/EditGrocery";
import CheckOut from "../screens/CheckOut";
import ChangeAddress from "../screens/ChangeAddress";

const InsideStack = createNativeStackNavigator();
const NewNavigation = () => {
  const userData = useSelector((state) => {
    state.users.user;
  });
  if (userData && userData.userData.role === "Admin") {
    return (
      <InsideStack.Navigator initialRouteName="Home">
        <InsideStack.Screen name="Home" component={HomeScreen} />
        <InsideStack.Screen name="Cart" component={Cart} />
        <InsideStack.Screen name="UserDetails" component={UserDetails} />
        {/* Admin Side */}
        <InsideStack.Screen name="Admin" component={DashBoard} />
        <InsideStack.Screen name="Edit Grocery" component={EditGrocery} />
        <InsideStack.Screen name="Checkout" component={CheckOut} />
        <InsideStack.Screen name="Map" component={ChangeAddress} />
        <InsideStack.Screen name="EditGrocery" component={EditGrocery} />
      </InsideStack.Navigator>
    );
  }
  return (
    <InsideStack.Navigator initialRouteName="Home">
      <InsideStack.Screen name="Home" component={HomeScreen} />
      <InsideStack.Screen name="Cart" component={Cart} />
      <InsideStack.Screen name="Admin" component={DashBoard} />
      <InsideStack.Screen name="UserDetails" component={UserDetails} />
      <InsideStack.Screen name="Checkout" component={CheckOut} />
      <InsideStack.Screen name="Map" component={ChangeAddress} />
      <InsideStack.Screen name="EditGrocery" component={EditGrocery} />
    </InsideStack.Navigator>
  );
};

export default NewNavigation;
