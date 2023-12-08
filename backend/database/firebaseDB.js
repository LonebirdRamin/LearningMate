/*
  Import the functions from the Firebase SDKs
*/
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/*
  Firebase's configuration.
*/
const firebaseConfig = {
  apiKey: "AIzaSyALdyD3IndX1A1DZyzT2UWWYpxBF9wLDV8",
  authDomain: "react-native-crud-b1954.firebaseapp.com",
  projectId: "react-native-crud-b1954",
  storageBucket: "react-native-crud-b1954.appspot.com",
  messagingSenderId: "1057117674323",
  appId: "1:1057117674323:web:b88c6f880c510ce41fdfa6",
  measurementId: "G-LT0PCE10K5",
};

/*
  Initialize Firebase and its services. (Firestore, Storage, Auth, etc.)
*/
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
