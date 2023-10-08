import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { configureStore } from "@reduxjs/toolkit";
import GroceryReducer from "./Reducers/GroceryReducer";
import { Provider, useDispatch, useSelector } from "react-redux";
import CartReducer from "./Reducers/CartReducers";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { auth, db } from "./Admin/config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDetails from "./screens/UserDetails";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import UserReducer, { getUser } from "./Reducers/UserReducer";
import { store } from "./store";
import { collection, getDocs, query, where } from "firebase/firestore";
import HomeScreen from "./screens/HomeScreen";
import { Cart } from "./screens/Cart";
import DashBoard from "./Admin/Screens/DashBoard";
import { EditGrocery } from "./Admin/Screens/EditGrocery";
import NewNavigation from "./navigation/newNavigation";
import BottomNavigation from "./navigation/bottomNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const UnregisteredStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const NInsideStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
function Authentication() {
  return (
    <UnregisteredStack.Navigator initialRouteName="Login">
      <UnregisteredStack.Screen name="Login" component={Login} />
      <UnregisteredStack.Screen
        name="SignUp"
        component={SignUp}
        // options={{ headerShown: false }}
      />
    </UnregisteredStack.Navigator>
  );
}
// function InsideLayout(params) {

//   return (

//     <InsideStack.Navigator initialRouteName="Home">
//       <InsideStack.Screen name="Home" component={HomeScreen} />
//       <InsideStack.Screen name="Cart" component={Cart} />
//       <InsideStack.Screen name="UserDetails" component={UserDetails} />
//     </InsideStack.Navigator>
//   );
// }
// function AdminSide() {
//   return (
//     <AdminStack.Navigator initialRouteName="Admin">
//       <AdminStack.Screen name="Admin" component={DashBoard} options={{headerShown:false}} />
//       <AdminStack.Screen name="EditGrocery" component={EditGrocery} />
//       <InsideStack.Screen name="UserDetails" component={UserDetails} />
//     </AdminStack.Navigator>
//   );
// }
const dbRef = collection(db, "Users");
export default function App() {
  const [user, setUser] = useState(null);
  const userD = useSelector((state) => state.users.user);
  const [userV, setUserV] = useState(null);
  let v = null;
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.email);
      // if (user) {
      setUser(user);
      if (user) {
        const q = query(dbRef, where("email", "==", `${user.email}`));
        getDocs(q)
          .then((d) => {
            d.forEach((doc) => {
              // console.log("doc:",doc.data());
              v = { ...doc.data() };
              // console.log("v:",v.role);
              setUserV(v);
            });
          })
          .then(() => {
            dispatch(getUser({ userData: v }));
          })
          .catch((e) => {});
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
          userV && userV.role === "User" ? (
              <InsideStack.Navigator>
                <InsideStack.Screen
                  name="Inside"
                  component={NewNavigation}
                  options={{ headerShown: false }}
                />
              </InsideStack.Navigator>
            ) : (
              <NInsideStack.Navigator>
                <NInsideStack.Screen
                  name={`${userV && userV.role}`}
                  component={BottomNavigation}
                  options={{ headerShown: false }}
                />
                <NInsideStack.Screen name="Edit Grocery" component={EditGrocery} />
              </NInsideStack.Navigator>
            )
        
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Authentication}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
      {/* <Stack.Navigator>
        {user ? (
          <>
            {v && v.userData.role !== "Admin" ? (
              <>
                <Stack.Screen
                  name="Inside"
                  component={NewNavigation}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="InsideAdmin"
                  component={BottomNavigation}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </>
        ) : (
          // <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen
            name="Auth"
            component={Authentication}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
    // {/* <AppNavigation></AppNavigation>  */}
  );
}
