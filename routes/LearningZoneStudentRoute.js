import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearningZoneStudent from "../screens/LearningZoneStudent";
import LearningZoneStudentClass from "../screens/LearningZoneStudentClass";

const Stack = createNativeStackNavigator();
/*
    This route is for LearningZone (Student).
*/
const LearningZoneStudentRoute = () => {
  return (
    <Stack.Navigator initialRouteName="LearningZoneStudent">
      <Stack.Screen
        name="LearningZoneStudent"
        component={LearningZoneStudent}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="LearningZoneStudentClass"
        component={LearningZoneStudentClass}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default LearningZoneStudentRoute;
