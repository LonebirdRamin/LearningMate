import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import assignmentStyles from "../../styles/assignmentStyles";
import IconBox from "./IconBox";
import AssignmentDetail from "./AssignmentDetail";
import DueDate from "./DueDate";

const height = Dimensions.get("screen").height;

const AssignmentBox = ({
  iconColor = "#F04E22",
  code = "CPE333",
  subject = "Software Engineering",
  task = "Lab7: Refactoring",
  dueDate = "00000-00-00",
  refreshing,
}) => {
  return refreshing ? (
    <View style={{ flex: 1, height: height }}></View>
  ) : (
    <TouchableOpacity
      style={assignmentStyles.box}
      onPress={() => {
        console.log("TEST");
      }}
    >
      <View style={assignmentStyles.upperPart}>
        <IconBox color={iconColor} name={code} />
        <AssignmentDetail subject={subject} task={task} />
      </View>
      <DueDate dueDate={dueDate} />
    </TouchableOpacity>
  );
};

export default AssignmentBox;
