import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import assignmentStyles from '../../styles/assignmentStyles'

const width = Dimensions.get("screen").width

const DueDate = ({dueDate="00 January 0000"}) => {
  return (
    <View style={assignmentStyles.dueDateContainer}>
        <View style={assignmentStyles.dueDateWrapper}>
            <Text style={{color: "white", fontWeight: "500", fontSize: width*0.03}}>SUBMISSION DATE</Text>
            <Text style={{color: "white", fontWeight: "500", fontSize: width*0.03}}>{dueDate}</Text>
        </View>
    </View>
  )
}

export default DueDate