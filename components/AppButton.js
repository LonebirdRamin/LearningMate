import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
/*
  This component is a app button for general use.
*/
const AppButton = ({
  bgColor = true,
  text = "None",
  textColor = "black",
  height = 50,
  handlePress,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: height / 2,
        justifyContent: "center",
        alignItems: "center",
        height: height,
        backgroundColor: bgColor ? "#F04E22" : "#393A3F",
        ...style,
      }}
      onPress={handlePress}
    >
      <Text style={{ color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
