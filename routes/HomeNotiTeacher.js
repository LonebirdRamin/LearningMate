import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageTeacher from "../screens/HomepageTeacher";
import Notification from "../screens/Notification";

const Stack = createNativeStackNavigator();

const HomeNotiTeacher = () => {
  //For navigatiing between Homepage(Teacher) and notification
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomepageTeacher}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNotiTeacher;
