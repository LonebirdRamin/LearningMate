import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../database/firebaseDB";
import { Alert } from "react-native";
import ipv4 from "../apiserver/ipv4";
/*
  This function will be called to create the new user to the Firebase authentication.
*/
const addUserToFirestore = async (uid, email) => {
  const db = getFirestore();
  const userData = {
    email,
  };

  try {
    const userRef = doc(db, "react-native-crud", uid);

    await setDoc(userRef, userData);
  } catch (error) { }
};

const signUp = async (email, password, navigation, loadState, setModal) => {
  loadState(true);
  setModal(false);
  try {
    const response = await fetch(`${ipv4.kong}checkRole?email=${email}`);
    const info = await response.json();

    if (info.length > 0 && info[0].role) {
      console.log("info.role =", info[0].role);

      const userRole = info[0].role;

      const authResponse = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await addUserToFirestore(authResponse.user.uid, authResponse.user.email);

      if (userRole === "student") {
        navigation("HomepageStudent", email);
      } else {
        navigation("HomepageTeacher", email);
      }
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Register failed, try again", [{ text: "Ok" }]);
  } finally {
    loadState(false);
  }
};

export default signUp;
