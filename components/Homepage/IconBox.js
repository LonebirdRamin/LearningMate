import { View, Text } from 'react-native'
import React from 'react'
import assignmentStyles from '../../styles/assignmentStyles';
import customStyles from '../../styles/customStyles';

const IconBox = ({name="CPE000", color="white"}) => {
    const subType = name.slice(0,3);
    const numType = name.slice(3)
  return (
    <View style={assignmentStyles.iconContainer}>
        
      <Text style={customStyles.h2}>{subType}</Text>
      <Text style={customStyles.h2}>{numType}</Text>
    </View>
  )
}

export default IconBox;