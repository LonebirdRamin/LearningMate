import { View, Text } from "react-native";
import React from "react";
import assignmentStyles from "../../styles/assignmentStyles";
/*
  The component storing the title of the assignment section.
*/
const AssignmentHeader = ({ number = 0 }) => {
  return (
    <View style={assignmentStyles.textContainer}>
      <View style={assignmentStyles.headWrapper}>
        <Text style={assignmentStyles.headerText}>Assignment</Text>
        <Text style={assignmentStyles.headerText}>{number} assignments</Text>
      </View>
      <Text style={assignmentStyles.subText}>
        {" "}
        {number === 0 ? "upcoming" : "posted"}
      </Text>
    </View>
  );
};

export default AssignmentHeader;
