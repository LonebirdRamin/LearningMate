import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as DocumentPicker from 'expo-document-picker'
import 'firebase/storage'; // Import Firebase Storage to upload file


const PlannerScreen = () => {
    const email = 'ramin.such@kmutt.ac.th';
    const [eventType, setEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const goInsert = async () => {
        setLoading(true);
        try {
          const insertData = {
            email,
            eventType,
            eventName,
            description,
            dueDate
          };
      
          console.log(insertData);
      
          const response = await axios.post('http://69.69.69.4:5001/api/createPlanner', insertData);
          console.log(response.data);
          // Check the response status code to determine if it was successful
          if (response.status === 201) {
            const result = response.data;
            console.log(result);
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error(error);
          alert('Post assignment failed!' + error.message);
        } finally {
          setLoading(false);
        }
      }


    const goBack = () => {
      navigation.goBack(); // This will navigate back to the previous screen.
    }

    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: '*/*', // You can specify the file type(s) you want to allow
          multiple: true, // You can specify whether you want multiple files or not
        });
    
        if (result.type === 'success') {
          setSelectedFile(result);
          console.log("SELECTED FILE: ", result.uri, result.type, result.name, result.size);
        } else {
          if (result.type === 'cancel') {
            // User canceled the document picker
          } else {
            throw new Error('Document picker encountered an error');
          }
        }
      } catch (error) {
        console.error('Error picking document:', error);
      }
    };

    const uploadFileToFirebaseStorage = async () => {
      if (selectedFile) {
        const storageRef = firebase.storage().ref();
        const fileName = 'your-desired-filename.extension'; // Set your desired filename
  
        try {
          const fileRef = storageRef.child(fileName);
          await fileRef.putFile(selectedFile.uri);
          console.log('File uploaded to Firebase Storage successfully!');
        } catch (error) {
          console.error('Error uploading file to Firebase Storage:', error);
        }
      } else {
        console.error('No file selected to upload.');
      }
    };
    

  return (
    <View style={styles.container}>
      <Text>Event type:</Text>
      <TextInput
      value={eventType}
      style={styles.input}
      placeholder = "Event type"
      autoCapitalize="none"
      onChangeText={(text) => setEventType(text)}
      ></TextInput>
      <Text>Event name:</Text>
      <TextInput
      value={eventName}
      style={styles.input}
      placeholder = "Event name"
      autoCapitalize="none"
      onChangeText={(text) => setEventName(text)}
      >
      </TextInput>
      <Text>Description:</Text>
      <TextInput
      value={description}
      style={styles.input}
      placeholder = "Description"
      autoCapitalize="none"
      onChangeText={(text) => setDescription(text)}
      >
      </TextInput>
      <Text>Due date:</Text>
      <TextInput
      value={dueDate}
      style={styles.input}
      placeholder = "Due date"
      autoCapitalize="none"
      onChangeText={(text) => setDueDate(text)}
      >
      </TextInput>
      <Button title="Insert" onPress={goInsert} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
    </View>
  )
}

export default PlannerScreen

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