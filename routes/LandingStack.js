import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import NavigationBarStudent from "./NavigationBarStudent";
import NavigationBarTeacher from "./NavigationBarTeacher";
const Stack = createNativeStackNavigator();

const LandingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            // animationTypeForReplace: 'push',
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="HomepageStudent"
          component={NavigationBarStudent}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="HomepageTeacher"
          component={NavigationBarTeacher}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LandingStack;
