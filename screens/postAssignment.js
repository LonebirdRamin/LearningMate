import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as DocumentPicker from 'expo-document-picker'
import firebase from 'firebase/app';
import 'firebase/storage';
import { app, storage } from '../database/firebaseDB';



const PostAssignment = () => {
    const [classID, setClassID] = useState('');
    const [assName, setAssName] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileSelected, setFileSelected] = useState(null); // State to store the selected file
    const navigation = useNavigation();

    const goInsert = async () => {
        setLoading(true);
        try {
          const insertData = {
            classID,
            assName,
            dueDate,
            description
          };
      
          console.log(insertData);
      
          const response = await axios.post('http://192.168.1.75:5001/api/createAssignment', insertData);
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

    const handleDocumentSelection = async () => {
      try {
        const documentResult = await DocumentPicker.getDocumentAsync({
          type: "*/*",
          multiple: true,
        });
  
        if (!documentResult.cancelled) {
          // Check if assets array is present and not empty
          if (documentResult.assets && documentResult.assets.length > 0) {
            documentResult.assets.forEach((asset) => {
              console.log(
                `URI: ${asset.uri}\n` +
                  `Name: ${asset.name}\n` +
                  `Type: ${asset.mimeType}\n` +
                  `Size: ${asset.size}`
              );
            });
  
            // If needed, you can perform additional actions with the selected assets.
            // For example, you can store them in state using setFileSelected.
            setFileSelected(documentResult.assets);
          } else {
            console.log("No assets selected");
          }
        } else {
          console.log("Document picking canceled");
        }
      } catch (error) {
        console.log("Error while selecting file: ", error);
      }
    };

    // const pickDocument = async () => {
    //   try {
    //     const result = await DocumentPicker.getDocumentAsync({
    //       type: '*/*', // You can specify the file type(s) you want to allow
    //       multiple: true, // You can specify whether you want multiple files or not
    //     });
    
    //     if (result.type === 'success') {
    //       setSelectedFile(result);
    //       console.log("SELECTED FILE: ", result.uri, result.type, result.name, result.size);
    //     } else {
    //       if (result.type === 'cancel') {
    //         // User canceled the document picker
    //       } else {
    //         throw new Error('Document picker encountered an error');
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error picking document:', error);
    //   }
    // };

    const uploadFileToFirebaseStorage = async () => {
      console.log("IN FUNCTION UPLOAD FILE TO FIREBASE STORAGE");
      if (fileSelected) {
        const storageRef = storage.ref();
        const fileName = 'your-desired-filename.extension'; // Set your desired filename
    
        try {
          const fileRef = storageRef.child(fileName);
          await fileRef.putFile(fileSelected.uri);
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
      <Text>Class ID:</Text>
      <TextInput
      value={classID}
      style={styles.input}
      placeholder = "Class ID"
      autoCapitalize="none"
      onChangeText={(text) => setClassID(text)}
      >
      </TextInput>
      <Text>Assignment name:</Text>
      <TextInput
      value={assName}
      style={styles.input}
      placeholder = "Assignment name"
      autoCapitalize="none"
      onChangeText={(text) => setAssName(text)}
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
      <Text>Description:</Text>
      <TextInput
      value={description}
      style={styles.input}
      placeholder = "Description"
      autoCapitalize="none"
      onChangeText={(text) => setDescription(text)}
      >
      </TextInput>
      <Button title="Select File" onPress={handleDocumentSelection} containerStyle={{ marginTop: 10, marginBottom: 20 }} />
      <Button
        title="Insert"
        onPress={() => {
          goInsert();
          uploadFileToFirebaseStorage();
        }}
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
      />
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
    </View>
  )
}

export default PostAssignment

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