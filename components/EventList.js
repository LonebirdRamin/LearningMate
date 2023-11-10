import { View, Text, StyleSheet, Pressable, TouchableOpacity, Touchable, FlatList } from 'react-native'
import { React, useState } from 'react'
import customStyles from '../styles/customStyles'

const EventList = ({data}) => {

  const maxLength = 25;
  const truncate = (text,maxLength)=>{
    if(text.length > maxLength){
      return text.slice(0,maxLength)+'...'
    }
    return text
  }

  return (
    <View style={customStyles.eventsContainer}>
      <FlatList
        data={data}
        renderItem={({item})=>(
          <TouchableOpacity style={customStyles.eventWidget}>
            <View style={customStyles.eventDetails}>
              <View style={[customStyles.eventIcon,{backgroundColor:'#F04E22',alignItems:'center'}]}>
                <Text style={customStyles.h2}>{item.class_id.substring(0,3)}</Text>
                <Text style={customStyles.h2}>{item.class_id.substring(3,6)}</Text>
              </View>
                <Text style={customStyles.h2}>{truncate(item.class_name,maxLength)}</Text>
                <Text style={[customStyles.h1,{lineHeight: 20.5}]}>
                  {item.start_time.slice(0,-3)+
                  ' - '+
                  item.end_time.slice(0,-3)}</Text>
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default EventList