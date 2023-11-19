import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'


const ScheduleScreen = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      fetch('http://192.168.1.179:5001/api/queryIdCard')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((result) => {
          setItems(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        })
    }, [isLoading])

    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 20 }}>{item.date_name}</Text>
              <Text style={{ fontSize: 20 }}>{item.class_id}</Text>
              <Text style={{ fontSize: 20 }}>{item.class_name}</Text>
              <Text style={{ fontSize: 20 }}>{item.start_time}</Text>
              <Text style={{ fontSize: 20 }}>{item.end_time}</Text>
            </View>
          );
    }

  return (
    <View style={{ flex: 1 }}>
        <FlatList
            data={items}
            keyExtractor={item => item.class_student_id}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={() => setIsLoading(true)}
        />
    </View>

  )
}

export default ScheduleScreen