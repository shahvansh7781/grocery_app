import { initializeApp } from "firebase/app";
import  {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

export const firebaseConfig = {
    apiKey: "AIzaSyAjPgs8TWlv8g76ahyCn9IJIRn748_WRPE",
    authDomain: "temp-grocery.firebaseapp.com",
    projectId: "temp-grocery",
    storageBucket: "temp-grocery.appspot.com",
    messagingSenderId: "52229859448",
    appId: "1:52229859448:web:59195d6d958473b4c0a58d",
    measurementId: "G-X66D75B8C1",
    databaseURL: 'https://temp-grocery-default-rtdb.asia-southeast1.firebasedatabase.app'
  };


  // Initialize Firebase
  
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export const auth = getAuth(app);