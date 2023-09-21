import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
import AppNavigation from './navigation/appNavigation';


LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead'])
export default function App() {

  
  
  return (
    
      <AppNavigation ></AppNavigation> 
    
   
  )
}
