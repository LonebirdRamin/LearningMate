import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements'


const departmentList = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      fetch('http://192.168.1.75:5000/api/queryTest')
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
              <Text style={{ fontSize: 20 }}>{item.department_name}</Text>
            </View>
          );
    }

  return (
    <View style={{ flex: 1 }}>
        <FlatList
            data={items}
            keyExtractor={item => item.department_id}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={() => setIsLoading(true)}
        />
    </View>

  )
}

export default departmentList