import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeItem } from "../utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../Reducers/GroceryReducer";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const data=useSelector((state) => state.groceries.data)

  useEffect(() => {
    // Fetch data and set isLoading accordingly
    dispatch(fetchGroceries())
      .then(() => setIsLoading(false)) // Data fetched, set isLoading to false
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // In case of an error, also set isLoading to false

        
      });
  }, [dispatch]);

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("OnBoarding");
  };

  const handleAdmin = async () => {
    navigation.push("Admin");
  };

  const handleCart = async () => {
    navigation.push("Cart");
  };

  return (
    <SafeAreaView style={{ padding: 100, alignItems: "center" }}>
      <Text style={{ fontSize: 30, padding: 20 }}>Home</Text>
      {isLoading ? ( // Show a loading indicator while data is being fetched
        <ActivityIndicator size="large" color="#06FF00" />
      ) : (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: "#06FF00",
              width: 200,
              height: 50,
              alignItems: "center",
            }}
            onPress={handleReset}
          >
            <Text style={{ fontSize: 30 }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#06FF00",
              width: 200,
              height: 50,
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={handleAdmin}
          >
            <Text style={{ fontSize: 30 }}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#06FF00",
              width: 200,
              height: 50,
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={handleCart}
          >
            <Text style={{ fontSize: 30 }}>Add To Cart</Text>
          </TouchableOpacity>

          <Text>{data && data.length > 0 ? data[0].name : 'No data available'}</Text>

        </>
      )}
    </SafeAreaView>
  );
}
