import firebase from 'firebase/compat/app'
import  {getDatabase} from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyAjPgs8TWlv8g76ahyCn9IJIRn748_WRPE",
    authDomain: "temp-grocery.firebaseapp.com",
    projectId: "temp-grocery",
    storageBucket: "temp-grocery.appspot.com",
    messagingSenderId: "52229859448",
    appId: "1:52229859448:web:59195d6d958473b4c0a58d",
    measurementId: "G-X66D75B8C1",
    databaseURL: 'https://temp-grocery-default-rtdb.asia-southeast1.firebasedatabase.app'
  };


  if (firebase.apps.length === 0)
  {
    firebase.initializeApp(firebaseConfig)
  }


  const db= getDatabase()

  export {db}