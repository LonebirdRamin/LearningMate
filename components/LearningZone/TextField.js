import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";

const TextField = ({ text, setModalVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={{
        marginVertical: "3%",
      }}
    >
      <Text style={modalFillAssignmentStyles.textLearning}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextField;
