import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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
import queryPlanner from "../backend/hooks/queryPlanner";

const mockUpData = [
  {
    title: "Fuck mere",
    subtitle: "Dont forgor condom",
    time: "00:00",
    type: "entertainment",
    date: "23-11-08",
  },
  {
    title: "Read bigdick data",
    subtitle: "Lecture 1 2 3 4 5 6",
    time: "01:00",
    type: "reading",
    date: "23-11-08",
  },
  {
    title: "Test1",
    subtitle: "Test...",
    time: "2:00",
    type: "working",
    date: "23-11-09",
  },
  {
    title: "Test2",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-09",
  },
  {
    title: "Test3",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-10",
  },
  {
    title: "Test4",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-14",
  },
  {
    title: "Fuck mere5",
    subtitle: "Dont forgor condom",
    time: "00:00",
    type: "entertainment",
    date: "23-11-14",
  },
  {
    title: "Read bigdick data 6",
    subtitle: "Lecture 1 2 3 4 5 6",
    time: "01:00",
    type: "reading",
    date: "23-11-14",
  },
  {
    title: "Test7",
    subtitle: "Test...",
    time: "2:00",
    type: "working",
    date: "23-11-14",
  },
  {
    title: "Test8",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-14",
  },
  {
    title: "Test9",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-14",
  },
  {
    title: "Test10",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
    date: "23-11-14",
  },
];




const PlannerScreen = () => {
  const [isModalVisible, setModalVisible] = useState();

  const [queriedPlanner, setQueriedPlanner] = useState([]);

  // Start - Manage planner info + status
  const [plannerData, setPlannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForUse, setDataForUse] = useState([]);
  // End - Manage planner info + status

  const email = useContext(DataContext); // email from login

  const handleModal = (state) => {
    setModalVisible(state);
  };

  // Start - manage day of planner
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  // End - manage day of planner

  // Start - data for adding new planner
  const [isAdded, setIsAdded] = useState(false); // plan = {type: "", title: "", detail: "", date: "", startTime: "", endTime: ""}
  // End - data for adding new planner

  // Start - formatting the start_time for DB
  const formatting = (data) => {
    return data.map((item) => {
      let dateTime = new Date(item.start_time);
      let date = dateTime.toISOString("YYYY-MM-DD").slice(0, 10);
      let time = dateTime.toLocaleTimeString().slice(0, 5);
      item.date = date;
      item.time = time;
      return item;
    });
  };
  // End - formatting the start_time for DB
  // Start - filter planner list
  useEffect(() => {
    
    setPlannerData(dataForUse.filter((e) => 
      
      e.date === selectedDay
    ));
    
    setIsAdded(false);
  }, [selectedDay, isAdded, dataForUse]);
  // End - filter planner list

  // Query - planner from database (Only first time)
  useEffect(() => {
    queryPlanner(email, setQueriedPlanner, setIsLoading);
    
  }, []);

  useEffect(()=>{
   
    setDataForUse(formatting(queriedPlanner))
  },[queriedPlanner])

 

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
        <PlannerCalendar
          day={selectedDay}
          setDay={setSelectedDay}
        ></PlannerCalendar>
      </View>
      {/*End - Calendar */}

      {/*Start - Add button */}
      <AddPlannerButton handlePress={() => setModalVisible(true)} />
      {/*End - Add button */}

      

      {/*Start - Planner list */}
      <View style={plannerStyles.plannerList}>
        <View style={plannerStyles.listBound}>
          {isLoading ? (
            <ActivityIndicator size={50} color="#F04E22" />
          ) : (
            <FlatList
              data={plannerData}
              renderItem={({ item }) => (
                <>
                  <PlannerBox
                    id = {item.planner_id}
                    title={item.planner_name}
                    subtitle={item.planner_detail}
                    time={item.time}
                    type={item.planner_category}
                  />
                  <View
                    style={{ height: Dimensions.get("screen").height * 0.015 }}
                  />
                </>
              )}
            />
          )}
        </View>
      </View>
      {/*End - Planner list */}

      {/*Start Modal */}
      <AddPlannerModal
        isModalVisible={isModalVisible}
        setModalVisible={handleModal}
        setIsAdded={setIsAdded}
      />
      {/*Start Modal */}
      
    </SafeAreaView>
  );
};

export default PlannerScreen;
