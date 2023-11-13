import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearningZoneTeacher from "../screens/LearningZoneTeacher";
import LearningZoneTeacherClass from "../screens/LearningZoneTeacherClass";

const Stack = createNativeStackNavigator();

const LearningZoneTeacherRoute = () => {
  return (
      <Stack.Navigator initialRouteName="LearningZoneTeacher">
        <Stack.Screen
          name="LearningZoneTeacher"
          component={LearningZoneTeacher}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="LearningZoneTeacherClass"
          component={LearningZoneTeacherClass}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

      </Stack.Navigator>
  );
};

export default LearningZoneTeacherRoute;
