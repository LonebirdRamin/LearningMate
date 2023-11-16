import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import customStyles from '../styles/customStyles'
import assignmentStyles from '../styles/assignmentStyles'

const LearningZoneTeacherClass = ({route, navigation}) => {

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width
const {class_} = route.params;
  return (
    <SafeAreaView>
        <View style={customStyles.pageBackground}>
            <View style={[customStyles.customBox1,
                {width:'100%',height:height*0.2,borderTopLeftRadius:0,borderTopRightRadius:0}]}>
                <View style={customStyles.pageTitleContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("LearningZoneTeacher")}
                    >
                      <Image source={require("../assets/icons/back.png")} style={{position:'absolute',right:width*0.32}}></Image>
                    </TouchableOpacity>
                    <Text style={customStyles.pageTitle}>{class_.class_id}</Text>
                </View>
                <Text style={[customStyles.h3,
                  { textAlign: "left", marginLeft: 24, marginTop: 10 }]}>
                  Class announcement
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: 'row',
                    marginTop:'auto',
                    marginBottom: 10
                  }}
                >
                  <TouchableOpacity>
                    <Text style={customStyles.bodySmall}>See all...</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{marginBottom: height*0.1}}>
              <View style={[assignmentStyles.container,{height:height*0.4}]}>
                <View style={assignmentStyles.textContainer}>
                  <View style={assignmentStyles.headWrapper}>
                    <Text style={assignmentStyles.headerText}>Assignment</Text>
                    <Text style={assignmentStyles.headerText}>0 assignments</Text>
                  </View>
                </View>
              </View>

              <View style={assignmentStyles.container}>
                <View style={assignmentStyles.textContainer}>
                  <View style={assignmentStyles.headWrapper}>
                    <Text style={assignmentStyles.headerText}>File</Text>
                  </View>
                </View>
              </View>
              
              <View style={assignmentStyles.container}>
                <View style={assignmentStyles.textContainer}>
                  <View style={assignmentStyles.headWrapper}>
                    <Text style={assignmentStyles.headerText}>Records</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

        </View>
    </SafeAreaView>
  )
}

export default LearningZoneTeacherClass