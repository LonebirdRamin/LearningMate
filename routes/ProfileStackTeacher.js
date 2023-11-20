import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import customStyles from "../styles/customStyles";
import profileStyles from "../styles/profileStyle";

import Setting from "../screens/Setting";
import Help from "../screens/Help";

import ProfileTeacher from "../screens/Teacher/ProfileTeacher";
import PersonalInfoTeacher from "../screens/Teacher/PersonalInfoTeacher";
const Stack = createNativeStackNavigator();

const ProfileStackTeacher = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileTeacher"
        component={ProfileTeacher}
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
        component={PersonalInfoTeacher}
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
    </Stack.Navigator>
  );
};

export default ProfileStackTeacher;
