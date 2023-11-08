import { View, Text, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import customStyles from '../styles/customStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment  from 'moment'


const Calendar = ({day, setDay}) => {  
  let week = []
  for(i=0;i<7;i++){
    week.push(moment().add(i,'days').format('DD:dddd'))
  }

  const getDaysFromWeek = (week)=>{
      return week.map((item)=>{
          const current = item.split(':')
          return (
            <Pressable key={current[0]} style={[customStyles.calendarWidget,
            current[1] === day? {backgroundColor:'rgba(207, 207, 252, 0.3)'}:{}]}
            onPress={()=>{
              setDay(current[1])}}>
              <Text style={customStyles.h4}>{current[0]}</Text>
              <Text style={customStyles.bodySmall}>{current[1].substring(0,2)}</Text>
              <View style={[{width:6,height:6,borderRadius:3,
                            margin:5},current[1] === day? {backgroundColor:'#F04E22'}:
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
