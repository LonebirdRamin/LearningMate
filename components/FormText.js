import { View, Text, TextInput } from "react-native";
import React from "react";

const FormText = ({ type="text",text = "None", boxSize = 55, protect = false, borderRadius=15 }) => {
  return (
    <View>
      <Text style={{ color: "#666680", paddingBottom: 8 }}>{text}</Text>
      <TextInput
        inputMode={type}
        secureTextEntry={protect}
        style={{
          borderRadius: borderRadius,
          paddingLeft: 15,
          color: "white",
          borderWidth: 1,
          borderColor: "rgba(78,78,97,0.8)",
          height: boxSize,
        }}
      />
    </View>
  );
};

export default FormText;
