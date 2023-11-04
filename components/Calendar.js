import { View, Text, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import customStyles from '../styles/customStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment  from 'moment'

const Calendar = () => {  
  let week = []
  for(i=0;i<7;i++){
    week.push(moment().add(i,'days').format('DD:dd'))
  }

  const [select,setSelect] = useState(moment().format('DD'))

  const getDaysFromWeek = (week)=>{
      return week.map((day)=>{
          const current = day.split(':')
          return (
            <Pressable key={current[0]} style={[customStyles.calendarWidget,
            current[0] === select? {backgroundColor:'rgba(207, 207, 252, 0.3)'}:{}]}
            onPress={()=>{
              setSelect(current[0])}}>
              <Text style={customStyles.h4}>{current[0]}</Text>
              <Text style={customStyles.bodySmall}>{current[1]}</Text>
              <View style={[{width:6,height:6,borderRadius:3,
                            margin:5},current[0] === select? {backgroundColor:'#F04E22'}:
                            {backgroundColor:'#4E4E61'}]}></View>
            </Pressable>
          )
      })
  }

  getDaysFromWeek(week)

  return (
    <View>
      <View style={customStyles.calendarContainer}>
        {getDaysFromWeek(week)}
      </View>
    </View>
  );
};

export default Calendar;
