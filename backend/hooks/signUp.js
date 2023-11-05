import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../database/firebaseDB";

const signUp = async ( email, password, navigation, loadState,  setModal) => {
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

    // await addUserToFirestore(response.user.uid, response.user.email);

    navigation();
  } catch (error) {
    console.log(error);
  } finally {
    loadState(false)
  }

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
};

export default signUp;
