import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from  'axios'

const PostAnnouncement = () => {
    const [announcement, setAnnouncement] = useState('')
    const [classID, setClassID] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const goPostAnnouncement = async () => {
        try {
            const updateData = {
                classID,
                announcement
            }
            console.log(updateData)

            const response = await axios.post('http://192.168.1.179:5001/api/postAnnouncement', updateData)
            console.log(response.data)
            if (response.status === 201) {
                const result = response.data
                console.log(result)
            } else {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            console.error(error)
            alert('Error posting announcement: '+ error.message)
        } finally {
            setLoading(false)
        }
    }


    const goBack = () => {
        navigation.goBack(); // This will navigate back to the previous screen.
      }


  return (
    <View style = {styles.container}>
      <Text>Class ID:</Text>
      <TextInput
        value={classID}
        style={styles.input}
        placeholder = "Class ID"
        autoCapitalize = "characters"
        onChangeText = {(text) => setClassID(text)}
      ></TextInput>
      <Text>Announcement:</Text>
      <TextInput
        value={announcement}
        style={styles.input}
        placeholder = "Announcement"
        autoCapitalize = "characters"
        onChangeText = {(text) => setAnnouncement(text)}
      ></TextInput>
      <Button title="Post assignment" onPress={goPostAnnouncement} containerStyle={{ marginTop: 10 }}/>
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
    </View>
  )
}

export default PostAnnouncement

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