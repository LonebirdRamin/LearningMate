import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
  
      const userData = {
        email: response.user.email
      };
  
      await addUserToFirestore(response.user.uid, response.user.email);
  
      alert('Check your email!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    const addUserToFirestore = async (uid, email) => {
        const db = getFirestore();
        const userData = {
          email
        };
      
        try {
          const userRef = doc(db, 'react-native-crud', uid);
      
        await setDoc(userRef, userData);
        console.log('User added to Firestore!');
        } catch (error) {
        console.log(error + 'User not added to Firestore!');
        }
      }

  return ({Loading})
}

export default signUp