import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import NavigationBarStudent from "./NavigationBarStudent";
import NavigationBarTeacher from "./NavigationBarTeacher";
import ProfileScreen from "../screens/ProfileScreen";
import customStyles from "../styles/customStyles";
import profileStyles from "../styles/profileStyle";
const Stack = createNativeStackNavigator();

const ProfileStackStudent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStudentStack"
        component={ProfileScreen}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity >
                <Image
                  source={require("../assets/icons/Profile/setting.png")}
                />
              </TouchableOpacity>
            );
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#1C1C23",
            height: 50
          },
          headerTitle: () => (
            <Text style={[customStyles.pageTitle]}>Profile</Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackStudent;
