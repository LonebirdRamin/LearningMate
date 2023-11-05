import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../database/firebaseDB";
import { Alert } from "react-native";

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

    const userData = {
      email: response.user.email,
    };

    await addUserToFirestore(response.user.uid, response.user.email);

    navigation();
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Register failed, try again", [{ text: "Ok" }]);
  } finally {
    loadState(false);
  }
};

export default signUp;
