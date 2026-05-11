// Firebase Config

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb_IEHXP5gFcf84-usCE1iMxM_ofTegDc",
  authDomain: "kekproject-cc43f.firebaseapp.com",
  projectId: "kekproject-cc43f",
  storageBucket: "kekproject-cc43f.firebasestorage.app",
  messagingSenderId: "330649220857",
  appId: "1:330649220857:web:7e9df5c6e1720e9cad1428",
  measurementId: "G-VB78HZHNN1"
};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Database

const db = firebase.firestore();

console.log("🔥 Firebase Connected");