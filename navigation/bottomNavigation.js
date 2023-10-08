import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import { Cart } from '../screens/Cart';
import UserDetails from '../screens/UserDetails';
import Icon from "react-native-vector-icons/Ionicons";
import DashBoard from '../Admin/Screens/DashBoard';
import { EditGrocery } from '../Admin/Screens/EditGrocery';
import ProfileScreen from '../screens/UserProfile';
import { useSelector } from 'react-redux';
const AdminTab = createBottomTabNavigator();
const BottomNavigation = () => {
  const data = useSelector((state) => state.Cart);
  return (
    <AdminTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart-sharp" : "cart-outline";
            } else if (route.name === "Admin") {
              iconName = focused ? "person-sharp" : "person-outline";
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
        <AdminTab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <AdminTab.Screen name="Cart" component={Cart} options={{ tabBarBadge: data && data.length, headerShown: false }}/>
        <AdminTab.Screen name="Admin" component={DashBoard} />
        <AdminTab.Screen name="UserDetails" component={ProfileScreen} />
        {/* Admin Side */}
        {/* <AdminTab.Screen name="Edit Grocery" component={EditGrocery} /> */}
      </AdminTab.Navigator>
  )
}

export default BottomNavigation;