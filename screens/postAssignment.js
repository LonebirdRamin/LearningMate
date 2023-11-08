import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const PostAssignment = () => {
    const [classID, setClassID] = useState('');
    const [assName, setAssName] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const goBack = async () => {
        setLoading(true);
        try {
          const insertData = {
            classID,
            assName,
            publishDate,
            dueDate,
            description
          };
      
          console.log(insertData);
      
          const response = await fetch('http://192.168.1.157:5001/api/createAssignment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(insertData),
          }
          //console.log("stringify ===== "+ JSON.stringify(insertData))
          );
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const result = await response.json();
          console.log("===== INSERTION COMPLETE =====");
        } catch (error) {
          console.error(error);
          alert('Post assignment failed!' + error.message);
        } finally {
          setLoading(false);
        }
      }


    const goInsert = () => {
        
    }

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
      <Text>Publish date:</Text>
      <TextInput
      value={publishDate}
      style={styles.input}
      placeholder = "Publish date"
      autoCapitalize="none"
      onChangeText={(text) => setPublishDate(text)}
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
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
      <Button title="Insert" onPress={goInsert} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
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