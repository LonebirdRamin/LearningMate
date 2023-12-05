import React, { useContext, createContext } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//Screen
import HomeNotiStudent from "./HomeNotiStudent";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/Student/ProfileScreen";
import PlannerScreen from "../screens/PlannerScreen";
import DataContext from "./DataContext";
import LearningZoneStudentRoute from "./LearningZoneStudentRoute";
import ProfileStackStudent from "./ProfileStackStudent";

const height = Dimensions.get("screen").height;

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: height * 0.0001,
    left: 23,
    right: 23,
    backgroundColor: "#4E4E61",
    marginBottom: 16,
    borderRadius: 25,
    elevation: 0,
    height: "8%",
  },
};
/*
    This route is for Navigation bar (Student).
*/
const NavigationBarStudent = () => {
  const email = useRoute();
  const handleImage = () => {};
  return (
    <DataContext.Provider value={email.params.email}>
      <Tab.Navigator
        screenOptions={screenOptions}
        initialRouteName="HomeNoti"
        backBehavior="initialRoute"
      >
        <Tab.Screen
          name="Planner"
          component={PlannerScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/plannerIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: focused ? "#FFFFFF" : "#A2A2B5",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="LearningZoneStudentRoute"
          component={LearningZoneStudentRoute}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/learningZoneIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 66,
                    height: 24,
                    tintColor: focused ? "#FFFFFF" : "#A2A2B5",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="HomeNoti"
          component={HomeNotiStudent}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/homeIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: focused ? "#FFFFFF" : "#A2A2B5",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/messageIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 66,
                    height: 24,
                    tintColor: focused ? "#FFFFFF" : "#A2A2B5",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStackStudent"
          component={ProfileStackStudent}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/profileIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 66,
                    height: 24,
                    tintColor: focused ? "#FFFFFF" : "#A2A2B5",
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </DataContext.Provider>
  );
};

export default NavigationBarStudent;
