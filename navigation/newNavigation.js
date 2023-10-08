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
          options={{ tabBarBadge: data && data.length, headerShown: false }}
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
};

export default NewNavigation;
