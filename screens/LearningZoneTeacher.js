import React, { useState, useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import customStyles from "../styles/customStyles";
import globleStyles from "../styles/globleStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import DataContext from "../routes/DataContext";
import queryClassTeacher from "../backend/hooks/queryClassTeacher";
import ClassList from "../components/LearningZone/ClassList";
import DropDown from "../components/Profile/DropDown";
import getCurrentSemTeacher from "../backend/hooks/getCurrentSemTeacher";
import getSemesterYearTeacher from "../backend/hooks/getSemesterYearTeacher";
import profileStyles from "../styles/profileStyle";

const LearningZoneTeacher = ({ navigation }) => {
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const email = useContext(DataContext); // email from login
  const [_class, setClass] = useState(null);
  const [filteredClass, setFilteredClass] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [isCurSemLoading, setIsCurSemLoading] = useState(true);
  const destination = "LearningZoneTeacherClass";
  const [selectedSem, setSelectedSem] = useState();
  const [currentSem,setCurrentSem] = useState();
  const [semYear, setSemYear] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getSemesterYearTeacher(email, setSemYear, setIsCurSemLoading);
      const data = await queryClassTeacher(email, setIsLoading);
      setClass(data);
    };
    
    fetchData();
  }, []);
  
  useEffect(()=>{
    getCurrentSemTeacher(email,setCurrentSem,setIsCurSemLoading);
  },[semYear])

  useEffect(()=>{
    if(currentSem && currentSem.class_period_semester && currentSem.class_period_year)
    {
      setSelectedSem(currentSem.class_period_semester + "/" + currentSem.class_period_year)
    }
  },[currentSem])

  useEffect(()=>{
    if(_class != null){
      const copy = JSON.parse(JSON.stringify(_class))
      const [semester, year] = selectedSem.split('/');
      setFilteredClass(copy.filter(item=>{
        return (item.class_period_year == year
                && item.class_period_semester == semester)}));
    }
  },[selectedSem])

  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      {isloading || isCurSemLoading ? (
        <View
          style={[
            customStyles.pageBackground,
            { display: "flex", justifyContent: "center" },
          ]}
        >
          <View style={globleStyles.loading}>
            <ActivityIndicator size={100} color="#F04E22"></ActivityIndicator>
          </View>
        </View>
      ) : (
        <View style={[customStyles.pageBackground]}>
          <View style={customStyles.pageTitleContainer}>
            <Text style={customStyles.pageTitle}>Learning Zone</Text>
          </View>
          <View style={[profileStyles.semester,{ marginLeft: "auto", marginRight: 10 }]}>
            <Image
              style={profileStyles.calendar}
              resizeMode="contain"
              source={require("../assets/icons/calendar.png")}
            />
            <Text style={profileStyles.text("#C1C1CD", height * 0.015, "500")}>
              Semester
            </Text>
            <DropDown
              setSelectedSem={setSelectedSem}
              activityLabel={[
                {
                  label:
                    currentSem?.class_period_semester +
                    "/" +
                    currentSem?.class_period_year,
                  value:
                    currentSem?.class_period_semester +"/"+
                    currentSem?.class_period_year,
                },
                ...((semYear.slice(1)).map((item)=>{
                  return {label: item.class_period_semester+"/"+item.class_period_year, value: (item.class_period_semester+"/"+item.class_period_year)}
                }))
              ]}
            />
          </View>
          <ClassList
            data={filteredClass}
            navigation={navigation}
            destination={destination}
          ></ClassList>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LearningZoneTeacher;
