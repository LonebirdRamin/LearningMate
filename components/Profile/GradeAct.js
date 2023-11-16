import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import profileStyles from '../../styles/profileStyle'
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const GradeAct = ({gpax}) => {
  return (
    <View>
        {/*Start - Grade or activity header */}
      <View style={profileStyles.gradeActHeader}>
        <Text style={profileStyles.text("white", height*0.025, "bold")}>
            GPAX {gpax}
        </Text>
        <Text>
            Drop down
        </Text>
      </View>
        {/*Start - Grade or activity header */}

    </View>
  )
}

export default GradeAct