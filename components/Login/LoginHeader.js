import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import loginStyles from "../../styles/loginStyle";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;


const LoginHeader = ({ text = "None" }) => {
  return (
    <View
      style={[
        loginStyles.textLogo,
        { alignItems: "center", justifyContent: "center", 
        rowGap: screenHeight*0.02},
      ]}
    >
      <Image
        resizeMode="contain"
        style={{
          width: screenWidth / 6,
          height: screenWidth / 6,
        }}
        source={require("../../assets/icons/hat.png")}
      />
      <Text
        style={{
          fontSize: screenWidth / 13,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default LoginHeader;
