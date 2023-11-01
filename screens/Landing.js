import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyle from "../styles/globleStyles";
import landingStyle from "../styles/landingStyle";
import AppButton from "../components/AppButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Landing = ({navigation}) => {
  return (
    
    <SafeAreaView
      style={[globleStyle.pageContainer]}
    >

      <View style={[landingStyle.pageLogo]}>
        <Image
          source={require("../assets/icons/learningmate.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "45%" }}
        />
      </View>
      <View style={landingStyle.buttonContainer}>
        <AppButton
          text="Register"
          bgColor="#F04E22"
          textColor="white"
          height={55}
          
        />
        <AppButton
          text="I have an account"
          bgColor="#393A3F"
          textColor="white"
          height={55}
          handlePress={()=>navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
