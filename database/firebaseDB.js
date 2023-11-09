// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth";
import 'firebase/storage'; // <- add this line
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALdyD3IndX1A1DZyzT2UWWYpxBF9wLDV8",
  authDomain: "react-native-crud-b1954.firebaseapp.com",
  projectId: "react-native-crud-b1954",
  storageBucket: "react-native-crud-b1954.appspot.com",
  messagingSenderId: "1057117674323",
  appId: "1:1057117674323:web:b88c6f880c510ce41fdfa6",
  measurementId: "G-LT0PCE10K5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore