import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/Student/ProfileScreen";
import customStyles from "../styles/customStyles";
import profileStyles from "../styles/profileStyle";
import PersonalInfoStudent from "../screens/Student/PersonalInfoStudent";
import Setting from "../screens/Setting";
import Help from "../screens/Help";
import GradeResult from "../screens/Student/GradeResult";
import Activity from "../screens/Student/Activity";
const Stack = createNativeStackNavigator();

const ProfileStackStudent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStudentStack"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Setting");
                }}
              >
                <Image
                  source={require("../assets/icons/Profile/setting.png")}
                />
              </TouchableOpacity>
            );
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Profile</Text>
          ),
        })}
      />

      <Stack.Screen
        name="Personal Info"
        component={PersonalInfoStudent}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={profileStyles.back}
                resizeMode="cover"
                source={require("../assets/icons/Profile/back.png")}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Personal Info</Text>
          ),
          animation: "slide_from_right",
        })}
      />

      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={profileStyles.back}
                resizeMode="cover"
                source={require("../assets/icons/Profile/back.png")}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Setting</Text>
          ),
          animation: "slide_from_right",
        })}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={profileStyles.back}
                resizeMode="cover"
                source={require("../assets/icons/Profile/back.png")}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Setting</Text>
          ),
          animation: "slide_from_right",
        })}
      />
      <Stack.Screen
        name="GradeResult"
        component={GradeResult}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={profileStyles.back}
                resizeMode="cover"
                source={require("../assets/icons/Profile/back.png")}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Grade Results</Text>
          ),
          animation: "slide_from_right",
        })}
      />

      <Stack.Screen
        name="Activity"
        component={Activity}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={profileStyles.back}
                resizeMode="cover"
                source={require("../assets/icons/Profile/back.png")}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Activity</Text>
          ),
          animation: "slide_from_right",
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackStudent;
