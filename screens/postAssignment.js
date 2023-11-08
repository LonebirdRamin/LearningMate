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
      <Button title="Select File" containerStyle={{ marginTop: 10, marginBottom: 20 }} />
      <Button title="Insert" onPress={goInsert} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
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