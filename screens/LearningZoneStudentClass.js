import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import customStyles from '../styles/customStyles'

const LearningZoneStudentClass = ({route}) => {

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width
const {class_} = route.params;
  return (
    <SafeAreaView>
        <View style={customStyles.pageBackground}>
            <View style={[customStyles.customBox1,
                {width:'100%',height:height*0.2,borderTopLeftRadius:0,borderTopRightRadius:0}]}>
                <View style={customStyles.pageTitleContainer}>
                    <Text style={customStyles.pageTitle}>{class_.class_id}</Text>
                </View>

            </View>
        </View>
    </SafeAreaView>
  )
}

export default LearningZoneStudentClass