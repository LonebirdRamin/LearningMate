import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import customStyles from "../styles/customStyles";
import Calendar from "../components/Calendar";
import plannerStyles from "../styles/plannerStyles";
import AddPlannerButton from "../components/Planner/AddPlannerButton";
import PlannerBox from "../components/Planner/PlannerBox";
import AddPlannerModal from "../components/Planner/AddPlannerModal";

const mockUpData = [
  {
    title: "Fuck mere",
    subtitle: "Dont forgor condom",
    time: "00:00",
    type: "entertainment",
  },
  {
    title: "Read bigdick data",
    subtitle: "Lecture 1 2 3 4 5 6",
    time: "01:00",
    type: "reading",
  },
  {
    title: "Test1",
    subtitle: "Test...",
    time: "2:00",
    type: "working",
  },
  {
    title: "Test3",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
  },
  {
    title: "Test3",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
  },
  {
    title: "Test3",
    subtitle: "dsadasdsa",
    time: "2:00",
    type: "dasdasdas",
  },
];

const PlannerScreen = () => {
  const [isModalVisible, setModalVisible] = useState();
  const handleModal=(state)=>{
    setModalVisible(state)
  }
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
        <Calendar></Calendar>
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
            data={mockUpData}
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
