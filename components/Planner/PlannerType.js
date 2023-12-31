import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import addPlannerModalStyles from "../../styles/addPlannerModalStyles";
/*
  This component is the choice selection of three planner type for edit and add.
*/
const PlannerType = ({ text, selectedType, setSelectedType, value }) => {
  return (
    <Pressable
      style={addPlannerModalStyles.typeBox(selectedType, value)}
      onPress={() => setSelectedType(value)}
    >
      <Text style={addPlannerModalStyles.typeText(selectedType, value)}>
        {text}
      </Text>
    </Pressable>
  );
};

export default PlannerType;
