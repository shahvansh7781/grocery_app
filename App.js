import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { LogBox } from "react-native";
import { useEffect } from "react";

export default function App() {

useEffect(() => {
 LogBox.ignoreAllLogs();
}, [])

  return <AppNavigation/>
}
