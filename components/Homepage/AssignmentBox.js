import { View, Text } from 'react-native'
import React from 'react'
import assignmentStyles from '../../styles/assignmentStyles'
import IconBox from './IconBox'
import AssignmentDetail from './AssignmentDetail'
import DueDate from './DueDate'

const AssignmentBox = ({iconColor="red", code="CPE000", subject="Software Engineering", task="Lab7: Refactoring"}) => {
  return (
    <View style={assignmentStyles.box}>
        <View style={assignmentStyles.upperPart}>
            <IconBox color={iconColor} name={code}/>
            <AssignmentDetail subject={subject} task={task}/>
        </View>
        <DueDate/>
    </View>
  )
}

export default AssignmentBox