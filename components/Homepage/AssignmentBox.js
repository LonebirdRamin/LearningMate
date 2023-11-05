import { View, Text } from 'react-native'
import React from 'react'
import assignmentStyles from '../../styles/assignmentStyles'
import IconBox from './IconBox'
import AssignmentDetail from './AssignmentDetail'
import DueDate from './DueDate'

const AssignmentBox = () => {
  return (
    <View style={assignmentStyles.box}>
        <View style={assignmentStyles.upperPart}>
            <IconBox/>
            <AssignmentDetail/>
        </View>
        <DueDate/>
    </View>
  )
}

export default AssignmentBox