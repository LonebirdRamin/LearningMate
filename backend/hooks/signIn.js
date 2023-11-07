import { firebaseAuth } from "../database/firebaseDB";
import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Homepage from "../../screens/Homepage";

const signIn = async (email, password, navigation, loadState) => {
  loadState(true);
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    navigation();
  } catch (error) {
    Alert.alert("Sign in fail", "Please check your email and password", [
      { text: "Ok" },
    ]);
  } finally {
    loadState(false);
  }
};

export default signIn;
