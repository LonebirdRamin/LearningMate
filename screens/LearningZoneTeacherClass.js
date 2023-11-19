import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native'
import React , { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import customStyles from '../styles/customStyles'
import assignmentStyles from '../styles/assignmentStyles'
import DataContext from '../routes/DataContext'
import queryAssignment from "../backend/hooks/queryGetTeacherAssignment";
import { useIsFocused } from '@react-navigation/native';

const LearningZoneTeacherClass = ({route, navigation}) => {

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width
const isFocused = useIsFocused();
const {class_} = route.params;
const email = useContext(DataContext)
const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
const [assignmentData, setAssignmentData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [assignNum, setAssignNum] = useState("-");

useEffect(() => {
  const fetchData = async () => {
    queryAssignment(
      email,
      setIsAssignmentLoading,
      setAssignmentData,
      setAssignNum
    );
  };
  if(isFocused){
    fetchData();
  }
}, [isFocused]);

useEffect(()=>{
  setFilteredData(assignmentData.filter((item)=>{
    return item.class_id == class_.class_id;
  }))
},[assignmentData])

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
                    <Text style={assignmentStyles.headerText}>{filteredData.length} assignments</Text>
                  </View>
                  <FlatList //Will make this into a component!
                    data={filteredData}
                    nestedScrollEnabled={true}
                    renderItem={({item})=>(
                      <View>
                        <Text>{item.class_name}</Text>
                        <Text>{item.assignment_name}</Text>
                      </View>
                      )}
                  />
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