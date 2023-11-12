import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globleStyles from "../styles/globleStyles";
import landingStyles from "../styles/landingStyles";
import AppButton from "../components/AppButton";

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={[globleStyles.pageContainer]}>
      <View style={[landingStyles.pageLogo]}>
        <Image
          source={require("../assets/icons/learningmate.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "45%" }}
        />
      </View>
      <View style={landingStyles.buttonContainer}>
        <AppButton
          text="Register"
          textColor="white"
          height={55}
          handlePress={() => navigation.navigate("Register")}
        />
        <AppButton
          text="I have an account"
          bgColor={false}
          textColor="white"
          height={55}
          handlePress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
