import { firebaseAuth } from "../database/firebaseDB";
import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Homepage from "../../screens/Homepage";
import ipv4 from "../apiserver/ipv4";

//Change ipv4 with the correspoing name: (kong,golf,ramin,mark,green)
//If your location change from the recorded in ipv4 obj
//Replace the ip accordingly in backend/apiserver/ipv4.js

const signIn = async (email, password, navigation, loadState) => {
  loadState(true);
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const info = await fetch(`${ipv4.greenTU}checkRole?email=${email}`);
    if (!info.ok) {
      throw new Error("Network response was not ok");
    }
    const convertedInfo = await info.json();
    const userRole = convertedInfo[0].role;
    if (userRole === "student") {
      navigation("HomepageStudent", email);
    } else {
      navigation("HomepageTeacher", email);
    }
    // navigation();
  } catch (error) {
    console.log(error)
    Alert.alert("Sign in fail", "Please check your email and password", [
      { text: "Ok" },
    ]);
  } finally {
    loadState(false);
  }
};

export default signIn;
