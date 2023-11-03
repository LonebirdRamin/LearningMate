import { firebaseAuth } from '../database/firebaseDB'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
      console.log('---------------LOGIN RESPONSE'+response);
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