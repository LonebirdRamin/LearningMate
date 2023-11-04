import { View, Text, StyleSheet, Pressable, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import customStyles from '../styles/customStyles'

const pressHandler = ()=>{
  console.log('Event pressed')
}

const EventList = () => {
  return (
    <View style={customStyles.eventsContainer}>

      <TouchableOpacity style={customStyles.eventWidget} onPress={pressHandler}>
        <View style={customStyles.eventDetails}>
          <View style={[customStyles.eventIcon,{backgroundColor:'#F04E22',alignItems:'center'}]}>
            <Text style={customStyles.h2}>CPE</Text>
            <Text style={customStyles.h2}>123</Text>
          </View>
          <Text style={customStyles.h2}>Event name</Text>
          <Text style={[customStyles.h1,{lineHeight: 20.5}]}>Time-time</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={customStyles.eventWidget} onPress={pressHandler}>
        <View style={customStyles.eventDetails}>
          <View style={[customStyles.eventIcon,{backgroundColor:'#F04E22',alignItems:'center'}]}>
            <Text style={customStyles.h2}>CPE</Text>
            <Text style={customStyles.h2}>123</Text>
          </View>
          <Text style={customStyles.h2}>Event name</Text>
          <Text style={[customStyles.h1,{lineHeight: 20.5}]}>Time-time</Text>
        </View>
      </TouchableOpacity>
  
      <TouchableOpacity>
        <Text style={customStyles.bodySmall} onPres>See all...</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EventList