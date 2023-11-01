import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
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
          
          name="Login"
          component={Login}
          options={{ headerShown: false }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LandingStack;
