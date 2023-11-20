import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import firebase from 'firebase/app'; // Import only the app module
import 'firebase/storage';
import { storage } from '@react-native-firebase/storage';
import { getStorage, ref, uploadBytes } from '@react-native-firebase/storage';

const SubmitAssignment = () => {
  const email = 'ramin.such@kmutt.ac.th';
  const [assID, setAssID] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const goSubmit = async () => {
    setLoading(true);
    try {
    //   const submitData = {
    //     assName,
    //     email
    //   };
  
      console.log(submitData);
    
      const studentIdResponse = await fetch(`http://192.168.1.64:5001/api/getStudentIdFromEmail?email=${email}`)
      //console.log('Response From StudentIdResponse: ',studentIdResponse.data)

      if (!studentIdResponse.ok) {
        throw new Error('Network studentIdResponse was not ok');
      }
      const result = await studentIdResponse.json();
      const student_id = result[0].student_id;
      console.log("STUDENT ID = ", student_id);
      
      const assignmentDueDateResponse = await fetch(`http://192.168.1.64:5001/api/getAssignmentDueDate?assignmentID=${assID}`)
      //console.log('Response From assignemntDueDateResponse: ', assignmentDueDateResponse.data)
      
      if (!assignmentDueDateResponse.ok) {
        throw new Error('Network assignmentDueDateResponse was not ok');
      }
      const resultFromAssDueDate = await assignmentDueDateResponse.json();
      const assDueDate = resultFromAssDueDate[0].assignment_due_date;
      const formattedDueDate = assDueDate.slice(0, 19).replace('T', ' ');
      console.log("ASSIGNMENT DUE DATE = ", formattedDueDate);

      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7)
      const formattedCurrentDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
      console.log('current date: ', formattedCurrentDate);

    //   const assIDresponse = await fetch(`http://192.168.1.64:5001/api/getSpecificAssignmentID?assignmentName=${assName}`)
    //   if (!assIDresponse.ok) {
    //     throw new Error('Network assIDresponse was not ok');
    //   }
    //   const resultFromAssID = await assIDresponse.json();
    //   const assignID = resultFromAssID[0].assignmentId;
    //   console.log("ASSIGNMENT ID = ", assignID);


      const submitData = {
        student_id,
        assID,
        formattedCurrentDate,
        formattedDueDate
      };
  
      const response = await axios.post('http://192.168.1.64:5001/api/submitAssignment', submitData)
      console.log("Response From Post Ass: ", response.data)
  
      if (response.status === 201) {
        const result = response.data
        console.log(result)
      } else {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error(error);
      alert('Submit assignment failed!' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Assume email =  ramin.such@kmutt.ac.th </Text>
      <Text>Assignment ID:</Text>
      <TextInput
      value={assID}
      style={styles.input}
      placeholder = "Assignment ID"
      autoCapitalize="none"
      onChangeText={(text) => setAssID(text)}
      >
      </TextInput>
      <Button title="Submit" onPress={goSubmit} />
      <Button title="Go Back" onPress={goBack} />
    </View>
  );
};

export default SubmitAssignment;

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
