import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//Screen
import Homepage from "../screens/Homepage";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LearningZoneStudent from "../screens/LearningZoneStudent";
import PlannerScreen from "../screens/PlannerScreen";
import HomeNotiTeacher from "./HomeNotiTeacher";
import DataContext from "./DataContext";


const height = Dimensions.get("screen").height

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: height*0.0001,
    left: 23,
    right: 23,
    backgroundColor: "#4E4E61",
    marginBottom: 16,
    borderRadius: 25,
    elevation: 0,
    height: "8%",
  },
};

const NavigationBar = () => {
  const email = useRoute();
  const handleImage = () => {};
  return (
    <DataContext.Provider value={email.params.email}>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home" backBehavior="initialRoute">
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
          name="Learningzone"
          component={LearningZoneStudent}
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
          component={HomeNotiTeacher}
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
          name="Profile"
          component={ProfileScreen}
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

export default NavigationBar;
