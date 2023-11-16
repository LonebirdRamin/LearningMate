import { View, Text, FlatList, Image, Button} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const AssignmentPage = ({ route }) => {
  const { result } = route.params; // Access the 'email' and 'result' parameters
  const [isLoading, setIsLoading] = useState(false); // Set isLoading to false initially
  console.log("Result dept: "+ result);
  const navigation = useNavigation();

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
        <Text style={{ fontSize: 20 }}>{item.assignment_id}</Text>
        <Text style={{ fontSize: 20 }}>{item.assignment_name}</Text>
        {/* <Text style={{ fontSize: 20 }}>{item.assignment_publish_date}</Text> */}
        <Text style={{ fontSize: 20 }}>{item.assignment_due_date}</Text>
        <Text style={{ fontSize: 20 }}>Submit Count</Text>
        <Text style={{ fontSize: 20 }}>{item.Submit_Count}</Text>
        <Text style={{ fontSize: 20 }}>Not Submit Count</Text>
        <Text style={{ fontSize: 20 }}>{item.Assigned_Count}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
      <Button title="Go Back" onPress={goBack} />
    </View>
  )
}

export default AssignmentPage;
