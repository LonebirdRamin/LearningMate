import { View, Text } from 'react-native'
import React from 'react'
import customStyles from '../styles/customStyles'
import { SafeAreaView } from 'react-native-safe-area-context'

const Calendar = () => {
  return (
    <View style={customStyles.calendarContainer}>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
      <View style={customStyles.calendarWidget} >
        <Text style={customStyles.h4}>1</Text>
        <Text style={customStyles.bodySmall}>Mo</Text>
      </View>
    </View>
  )
}

export default Calendar