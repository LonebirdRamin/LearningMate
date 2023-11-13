import { View, Text } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";

const data = {
    id: 64070503433,
    eduLevel: "Bechelor's Degree",
    Faculty: "Engineering",
    Department: "Computer Engineering"
}

const InfoBox = () => {
  return (
    <View>
      <Text style={customStyles.h2}>Personal Info</Text>
      <View>

      </View>
    </View>
  );
};

export default InfoBox;
