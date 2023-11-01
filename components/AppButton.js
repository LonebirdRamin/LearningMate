import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = ({
  bgColor = "white",
  text = "None",
  textColor = "black",
  height = 50,
  handlePress
}) => {
  return (
    <TouchableOpacity style={{ 
      borderRadius: height/2,
      justifyContent: 'center',
      alignItems: 'center',
      height: height, backgroundColor: bgColor }}
      onPress={handlePress}
      >
      <Text style={{ color: textColor }}>{text}</Text>
    </TouchableOpacity>
    // <Text style={{color: 'white'}}>test</Text>
  );
};

export default AppButton;
