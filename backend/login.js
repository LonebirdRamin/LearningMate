import { firebaseAuth } from '../database/firebaseDB'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
      console.log(response);
      useNavigation.navigate('AddUserScreen');
    } catch (error) {
      console.log(error);
      alert('Sign in fail!' + error.message);
    } finally {
      setLoading(false);
    }
  
    return ({Loading})
}

export default signIn