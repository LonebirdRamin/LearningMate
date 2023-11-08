import { View, Text, FlatList, Image, Button, StyleSheet, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import PostAssignment from './postAssignment';
import firebaseAuth from '../database/firebaseDB';

const DepartmentList = ({ route }) => {
  const { result } = route.params; // Access the 'email' and 'result' parameters
  const [isLoading, setIsLoading] = useState(false); // Set isLoading to false initially
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;
  const navigation = useNavigation(); // Add this line to get the navigation object
  console.log("Result dept: "+ result);

  const goInsert = async () => {
    navigation.navigate('PostAssignment');
  }

  const goBack = () => {
    navigation.goBack(); // This will navigate back to the previous screen.
  };

  useEffect(() => {
    // No need to fetch data here since it's already passed as 'result'
  }, []); // The empty dependency array ensures this effect runs only once

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>{item.class_id}</Text>
        <Text style={{ fontSize: 20 }}>{item.class_name}</Text>
        <Text style={{ fontSize: 20 }}>{item.date_name}</Text>
        <Text style={{ fontSize: 20 }}>{item.start_time}</Text>
        <Text style={{ fontSize: 20 }}>{item.end_time}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Go to insert page" onPress={goInsert} containerStyle={{ marginTop: 10 }}  />
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
      <FlatList
        data={result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
      {/* <Text style={{ fontSize: 20 }}>Class ID:</Text>
      <TextInput
          value={email}
          style={styles.input}
          placeholder = "Class ID"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text style={{ fontSize: 20 }}>Assignment name:</Text>
      <TextInput
          value={email}
          style={styles.input}
          placeholder = "Assignment name"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text style={{ fontSize: 20 }}>Description:</Text>
      <TextInput
          value={email}
          style={styles.input}
          placeholder = "Description"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text style={{ fontSize: 20 }}>Publish date:</Text>
      <TextInput
          value={email}
          style={styles.input}
          placeholder = "Publish date"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text style={{ fontSize: 20 }}>Due date:</Text>
      <TextInput
          value={email}
          style={styles.input}
          placeholder = "Due date"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Button title="Insert" containerStyle={{ marginTop: 10 }}/> */}
    </View>
  )
}

export default DepartmentList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: '60%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center'
  }
});