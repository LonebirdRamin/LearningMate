import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import customStyles from "../styles/customStyles";
import Calendar from "../components/Calendar";
import plannerStyles from "../styles/plannerStyles";
import AddPlannerButton from "../components/Planner/AddPlannerButton";
import PlannerBox from "../components/Planner/PlannerBox";
import AddPlannerModal from "../components/Planner/AddPlannerModal";
import { useRoute } from "@react-navigation/native";
import DataContext from "../routes/DataContext";
import moment from "moment";
import PlannerCalendar from "../components/Planner/PlannerCalender";
const mockUpData = [
  {
    title: "Fuck mere",
    subtitle: "Dont forgor condom",
    time: "00:00",
    type: "entertainment",
    date: "23-11-08"
  },
  {
    title: "Read bigdick data",
    subtitle: "Lecture 1 2 3 4 5 6",
    time: "01:00",
    type: "reading",
    date: "23-11-08"
  },
  {
    title: "Test1",
    subtitle: "Test...",
    time: "2:00",
    type: "working",
    date: "23-11-09"
  },
  {
    title: "Test2",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-09"

  },
  {
    title: "Test3",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-10"
  },
  {
    title: "Test4",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: '23-11-14'
  },
  {
    title: "Fuck mere5",
    subtitle: "Dont forgor condom",
    time: "00:00",
    type: "entertainment",
    date: '23-11-14'

  },
  {
    title: "Read bigdick data 6",
    subtitle: "Lecture 1 2 3 4 5 6",
    time: "01:00",
    type: "reading",
    date: '23-11-14'

  },
  {
    title: "Test7",
    subtitle: "Test...",
    time: "2:00",
    type: "working",
    date: '23-11-14'

  },
  {
    title: "Test8",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: '23-11-14'

  },
  {
    title: "Test9",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: '23-11-14'

  },
  {
    title: "Test10",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: '23-11-14'

  },
];


const PlannerScreen = () => {
  const [isModalVisible, setModalVisible] = useState();
  const [plannerData, setPlannerData] = useState([])
  // console.log("PLanner" + user.params)
  const email = useContext(DataContext) // email from login
  // console.log("Planner" + email);
  const handleModal=(state)=>{
    setModalVisible(state)
  }

  // Start - manage day of planner
  const [selectedDay, setSelectedDay] = useState(moment().format("YY-MM-DD"));
  // End - manage day of planner

  // Start - filter planner list
  useEffect(()=>{
    setPlannerData(mockUpData.filter(e=> e.date === selectedDay))
  }
    ,[selectedDay])
  // End - filter planner list

  // Start - data for adding new planner
  const [plan, setPlan] = useState({}); // plan = {type: "", title: "", detail: "", date: "", startTime: "", endTime: ""}
  // End - data for adding new planner
  
  return (
    <SafeAreaView style={globleStyles.pageContainer}>
      {/*Start - Header part */}
      <View style={plannerStyles.headerContainer}>
        <View style={customStyles.pageTitleContainer}>
          <Text style={customStyles.pageTitle}>Planner</Text>
        </View>
      </View>
      {/*End - Header part */}

      {/*Start - Calendar */}
      <View style={plannerStyles.calendarContainer}>
        
        <PlannerCalendar day={selectedDay} setDay={setSelectedDay}></PlannerCalendar>
      </View>
      {/*End - Calendar */}

      {/*Start - Add button */}
      <AddPlannerButton 
        handlePress={()=>setModalVisible(true)}
      />
      {/*End - Add button */}

      {/*Start - Planner list */}
      <View style={plannerStyles.plannerList}>
        <View style={plannerStyles.listBound}>
          <FlatList
            data={plannerData}
            renderItem={({ item }) => (
              <>
                <PlannerBox
                  title={item.title}
                  subtitle={item.subtitle}
                  time={item.time}
                  type={item.type}
                />
                <View style={{height: Dimensions.get("screen").height*0.015}}/>
              </>
            )}
          />
        </View>
      </View>
      {/*End - Planner list */}

      {/*Start Modal */}
      <AddPlannerModal isModalVisible={isModalVisible} setModalVisible={handleModal}/>
      {/*Start Modal */}

    </SafeAreaView>
  );
};

export default PlannerScreen;
