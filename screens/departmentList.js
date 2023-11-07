import { View, Text, FlatList, Image, Button, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AssignmentPage from './assignmentGuide';

const DepartmentList = ({ route }) => {
  const { result } = route.params; // Access the 'email' and 'result' parameters
  const [isLoading, setIsLoading] = useState(false); // Set isLoading to false initially
  console.log("Result dept: "+ result);
  const navigation = useNavigation();

  const goAssignment = async () => {
    navigation.navigate('AssignmentPage');
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
      <Button title="Go to assignment page" onPress={goAssignment} containerStyle={{ marginTop: 10 }}  />
      <Button title="Go Back" onPress={goBack} containerStyle={{ marginTop: 10, marginBottom: 20 }}/>
      <FlatList
        data={result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
    </View>
  )
}

export default DepartmentList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
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