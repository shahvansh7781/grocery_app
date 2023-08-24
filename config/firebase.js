// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOocdV6P9mAilJ1Mr5oxyCttG_v8go6PQ",
  authDomain: "grocery-app-react-native.firebaseapp.com",
  projectId: "grocery-app-react-native",
  storageBucket: "grocery-app-react-native.appspot.com",
  messagingSenderId: "11139080005",
  appId: "1:11139080005:web:af58449068b3235dfce82c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);