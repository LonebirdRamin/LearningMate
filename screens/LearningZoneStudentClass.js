import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView} from 'react-native'
import React , { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import customStyles from '../styles/customStyles'
import assignmentStyles from '../styles/assignmentStyles'
import DataContext from '../routes/DataContext'
import queryAssignment from "../backend/hooks/queryAssignmentStudent";
import { useIsFocused } from '@react-navigation/native';
import AssignmentList from '../components/LearningZone/AssignmentList'

const LearningZoneStudentClass = ({route, navigation}) => {

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
                {width:'100%',maxHeight:height*0.2,height:'fit-content'
                ,borderTopLeftRadius:0,borderTopRightRadius:0,
                overflow:'hidden'}]}>
                <View style={customStyles.pageTitleContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("LearningZoneStudent")}
                      style={{position:'absolute',right:width*0.32}}
                    >
                      <Image source={require("../assets/icons/back.png")}></Image>
                    </TouchableOpacity>
                    <Text style={customStyles.pageTitle}>{class_.class_id}</Text>
                </View>
                <Text style={[customStyles.h3,
                  { textAlign: "left", marginLeft: 24, marginVertical:10}]}>
                  Class announcement
                </Text>
                <Text style={[customStyles.h3,
                  { textAlign: "left", marginLeft: 24}]}>
                Insert announcement here!</Text>
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
              <View style={{paddingHorizontal:width*0.05 }}>
                
                <View>
                  <View style={{display:'flex',flexDirection:'row',marginTop:height*0.04}}>
                    <Text style={[customStyles.h4,{flex:1}]}>Assignment</Text>
                    <Text style={customStyles.h4}>{filteredData.length} assignments</Text>
                  </View>
                  <View style={customStyles.learningZoneAssignmentWidget}>
                    <AssignmentList 
                    data={filteredData}/>
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
                </View>

              </View>
            </ScrollView>

        </View>
    </SafeAreaView>
  )
}

export default LearningZoneStudentClass