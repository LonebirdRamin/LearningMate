import { View, Text, StyleSheet, TextInput, ActivityIndicator, SafeAreaViewBase } from 'react-native'
import React, { useState } from 'react'
import { firebaseAuth } from '../database/firebaseDB'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import { AddUserScreen } from './addUser'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import querySchedule from './querySchedule'; // Make sure it's a default import
import ScheduleScreen from './scheduleScreens';
import axios from 'axios';
import departmentList from './departmentList';
import AssignmentPage from './assignmentGuide';
import PostAssignment from './postAssignment';
import PlannerScreen from './plannerScreen';

const loginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebaseAuth;
    const navigation = useNavigation(); // Add this line to get the navigation object

const signIn = async () => {
  setLoading(true);
  try {
    console.log(email);
    const response = await fetch(`http://192.168.1.75:5001/api/checkRole?email=${email}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log("ROLE : " + result[0].role);
    const userRole = result[0].role;

    if( userRole === 'student' ) {
      const response = await fetch(`http://192.168.1.75:5001/api/getStudentSchedule?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resultFinal = await response.json();
      // Pass the result as a parameter when navigating
      navigation.navigate('departmentList', { result: resultFinal });
    } else {
      const response = await fetch(`http://192.168.1.75:5001/api/getTeacherAssignment?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resultFinal = await response.json();
      console.log("Schedule Result : " + resultFinal);
      // Pass the result as a parameter when navigating
      navigation.navigate('AssignmentPage', { result: resultFinal });
    }


  } catch (error) {
    console.error(error);
    alert('Query schedule failed!' + error.message);
  } finally {
    setLoading(false);
  }
};



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

const goInsert = async () => {
  navigation.navigate('PostAssignment');
}

const goInsertPlanner = async () => {
  navigation.navigate('PlannerScreen');
}

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://cdn.discordapp.com/attachments/961842219730485250/1169292408148729969/dfm3mne-ef909324-2243-4a59-b899-66ddb0e8e290.png?ex=6554df6a&is=65426a6a&hm=24438a67b6e0ea9b2bf99c564006c7802a3547a4f5ee4d108f0874f9e1909569&'}}
        style={{width: 200, height: 200}}
        containerStyle={{marginLeft:'auto', marginRight: 'auto', marginTop: 0, marginBottom: 10}}
      />
      <TextInput
      value={email}
      style={styles.input}
      placeholder = "Email"
      autoCapitalize="none"
      onChangeText={(text) => setEmail(text)}
      >
      </TextInput>

      <TextInput
      secureTextEntry={true}
      value={password}
      style={styles.input}
      placeholder = "Password"
      autoCapitalize="none"
      onChangeText={(text) => setPassword(text)}
      >
      </TextInput>

      { loading ? (
      <ActivityIndicator size="large" color='#0000ff'/>
      ) : (
        <>
          <Button title="Login" onPress={signIn} containerStyle={{ marginTop: 10 }}  />
          <Button title="Create Account" onPress={signUp} containerStyle={{ marginTop: 10 }}/>
          <Button title="Go to post assignment page" onPress={goInsert} containerStyle={{ marginTop: 10 }} />
          <Button title="Go to add planner page" onPress={goInsertPlanner} containerStyle={{ marginTop: 10 }} />
        </>
      )}
    </View>
  )
}

export default loginScreen;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff'
    }
});