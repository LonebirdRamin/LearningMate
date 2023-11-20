import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../database/firebaseDB";
import { Alert } from "react-native";
import ipv4 from "../apiserver/ipv4";

const addUserToFirestore = async (uid, email) => {
  const db = getFirestore();
  const userData = {
    email,
  };

  try {
    const userRef = doc(db, "react-native-crud", uid);

    await setDoc(userRef, userData);
    console.log("User added to Firestore!");
  } catch (error) {
    console.log(error + "User not added to Firestore!");
  }
};

const signUp = async (email, password, navigation, loadState, setModal) => {
  loadState(true);
  setModal(false);
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const info = await fetch(`${ipv4.golf}checkRole?email=${email}`);
    if (!info.ok) {
      throw new Error("Network response was not ok");
    }
    const convertedInfo = await info.json();
    const userRole = convertedInfo[0].role;
    

    await addUserToFirestore(response.user.uid, response.user.email);

    if (userRole === "student") {
      navigation("HomepageStudent", email);
    } else {
      navigation("HomepageTeacher", email);
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Register failed, try again", [{ text: "Ok" }]);
  } finally {
    loadState(false);
  }
};

export default signUp;
