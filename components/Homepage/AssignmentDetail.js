import { View, Text } from "react-native";
import React from "react";
import assignmentStyles from "../../styles/assignmentStyles";

const AssignmentDetail = ({ subject, task }) => {
  return (
    <View style={assignmentStyles.detailContainer}>
      <Text style={{ color: "white", fontWeight: "bold" }}>{subject}</Text>
      <Text style={{ color: "#A2A2B5" }}>{task}</Text>
    </View>
  );
};

export default AssignmentDetail;
