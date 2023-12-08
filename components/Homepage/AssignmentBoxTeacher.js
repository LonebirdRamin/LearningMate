import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import assignmentStyles from "../../styles/assignmentStyles";
import IconBox from "./IconBox";
import AssignmentDetail from "./AssignmentDetail";
import DueDate from "./DueDate";
import SubmitValue from "./SubmitValue";

/* 
  This component uses to display assignment in Flatlist 
  which data = submission info of teacher
*/

const AssignmentBoxTeacher = ({
  iconColor = "#F04E22",
  code,
  subject,
  task,
  dueDate,
  submitCount = 50,
  totalCount = 90,
}) => {
  return (
    <TouchableOpacity
      style={assignmentStyles.box}
      onPress={() => {
        console.log("Assignment Teacher Clicked!");
      }}
    >
      <View style={assignmentStyles.upperPart}>
        <IconBox color={iconColor} name={code} />
        <AssignmentDetail subject={subject} task={task} />
        <SubmitValue submitCount={submitCount} totalCount={totalCount} />
      </View>
      <DueDate dueDate={dueDate} />
    </TouchableOpacity>
  );
};

export default AssignmentBoxTeacher;
