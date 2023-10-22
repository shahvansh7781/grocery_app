// // Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDOocdV6P9mAilJ1Mr5oxyCttG_v8go6PQ",
//   authDomain: "grocery-app-react-native.firebaseapp.com",
//   projectId: "grocery-app-react-native",
//   storageBucket: "grocery-app-react-native.appspot.com",
//   messagingSenderId: "11139080005",
//   appId: "1:11139080005:web:af58449068b3235dfce82c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// module.exports = app;
const firebase = require("firebase/compat/app");
const { getDatabase } = require("firebase/database");
const { getFirestore } = require("firebase/firestore");
const {getStorage} = require('firebase/storage')

const firebaseConfig = {
  apiKey: "AIzaSyAjPgs8TWlv8g76ahyCn9IJIRn748_WRPE",
  authDomain: "temp-grocery.firebaseapp.com",
  projectId: "temp-grocery",
  storageBucket: "temp-grocery.appspot.com",
  messagingSenderId: "52229859448",
  appId: "1:52229859448:web:59195d6d958473b4c0a58d",
  measurementId: "G-X66D75B8C1",
  databaseURL:
    "https://temp-grocery-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(firebaseConfig);

exports.db = getDatabase();
exports.dbF = getFirestore(app);
exports.storage = getStorage(app);

