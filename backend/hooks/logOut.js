import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
/*
  This will used for the user to logout the application
*/
const logOut = (navigation) => {
  signOut(auth)
    .then(() => {
      navigation();
    })
    .catch((error) => {
      alert("Logout failed!" + error.message);
    });
};

export default logOut;
