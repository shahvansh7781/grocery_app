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


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Contact from "../screens/Contact";
import ProfileScreen from "../screens/UserProfile";

const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AdminTab = createBottomTabNavigator();
const NewNavigation = () => {
  const userData = useSelector((state) => {
    state.users.user;
  });
  const data = useSelector((state) => state.Cart);
  // if (userData && userData.userData.role !== "Admin") {
    return (
 // Rushit_New
//      <InsideStack.Navigator initialRouteName="Home">
//         <InsideStack.Screen name="Home" component={HomeScreen} />
//         <InsideStack.Screen name="Cart" component={Cart} />
//         <InsideStack.Screen name="UserDetails" component={UserDetails} />
//         {/* Admin Side */}
//         <InsideStack.Screen name="Admin" component={DashBoard} />
//         <InsideStack.Screen name="Edit Grocery" component={EditGrocery} />
//         <InsideStack.Screen name="Checkout" component={CheckOut} />
//         <InsideStack.Screen name="Map" component={ChangeAddress} />
//         <InsideStack.Screen name="EditGrocery" component={EditGrocery} />
//       </InsideStack.Navigator>
//     );
//   }
//   return (
//     <InsideStack.Navigator initialRouteName="Home">
//       <InsideStack.Screen name="Home" component={HomeScreen} />
//       <InsideStack.Screen name="Cart" component={Cart} />
//       <InsideStack.Screen name="Admin" component={DashBoard} />
//       <InsideStack.Screen name="UserDetails" component={UserDetails} />
//       <InsideStack.Screen name="Checkout" component={CheckOut} />
//       <InsideStack.Screen name="Map" component={ChangeAddress} />
//       <InsideStack.Screen name="EditGrocery" component={EditGrocery} />
//     </InsideStack.Navigator>
//   ); 
// Rushit_New

//Vansh_New
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart-sharp" : "cart-outline";
            } else if (route.name === "Contact") {
              iconName = focused ? "help-circle" : "help-circle-outline";
            }
            else if (route.name === "UserDetails") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }

            // You can return any JSX element here for your icon
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => null,
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{ tabBarBadge: data && data.length }}
        />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="UserDetails" component={ProfileScreen} />
      </Tab.Navigator>
    );
  // } 
  // else {
  //   return (
  //     <AdminTab.Navigator
  //       initialRouteName="Home"
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ focused, color, size }) => {
  //           let iconName;

  //           if (route.name === "Home") {
  //             iconName = focused ? "home-sharp" : "home-sharp";
  //           } else if (route.name === "Cart") {
  //             iconName = focused ? "cart-sharp" : "cart-sharp";
  //           } else if (route.name === "Admin") {
  //             iconName = focused ? "person-sharp" : "person-sharp";
  //           } else if (route.name === "UserDetails") {
  //             iconName = focused ? "settings-sharp" : "settings-sharp";
  //           }

  //           // You can return any JSX element here for your icon
  //           return <Icon name={iconName} size={size} color={color} />;
  //         },
  //         tabBarLabel: () => null,
  //       })}
  //       tabBarOptions={{
  //         activeTintColor: "#2DDC4A",
  //         inactiveTintColor: "black",
  //       }}
  //     >
  //       <AdminTab.Screen name="Home" component={HomeScreen} />
  //       <AdminTab.Screen name="Cart" component={Cart} />
  //       <AdminTab.Screen name="Admin" component={DashBoard} />
  //       <AdminTab.Screen name="UserDetails" component={UserDetails} />
  //       {/* Admin Side */}
  //       <AdminTab.Screen name="Edit Grocery" component={EditGrocery} />
  //     </AdminTab.Navigator>
  //   );
  // }
// Vansh_New
};

export default NewNavigation;
