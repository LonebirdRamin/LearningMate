import { firebaseAuth } from "../database/firebaseDB";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Homepage from "../../screens/Homepage";

const signIn = async (email, password, navigation) => {
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    navigation.dispatch(StackActions.replace("IndexStack"))
    
  } catch (error) {
    alert("Sign in fail!" + error.message);
  } finally {
    // setLoading(false);
  }
};

export default signIn;
