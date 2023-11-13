import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import assignmentStyles from "../../styles/assignmentStyles";
import IconBox from "./IconBox";
import AssignmentDetail from "./AssignmentDetail";
import DueDate from "./DueDate";

const AssignmentBoxTeacher = ({
  iconColor = "#F04E22",
  code = "CPE334",
  subject = "Software Engineering",
  task = "Lab7: Refactoring",
  dueDate = "9999-99-99",
  submitCount = 50,
  totalCount = 90,
}) => {
  return (
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

export default AssignmentBoxTeacher;
