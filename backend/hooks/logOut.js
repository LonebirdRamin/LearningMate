import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const logOut = (navigation) => {
  signOut(auth)
    .then(() => {
      navigation();
    })
    .catch((error) => {
      console.error(error);
      alert("Logout failed!" + error.message);
    });
};

export default logOut;
