import { View, Text } from "react-native";
import React from "react";
import AssignmentForm from "./AssignmentForm";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import AnnounceForm from "./AnnounceForm";
import RecordForm from "./RecordForm";
import PostFileTeacher from "./PostFileTeacher";

const FormLearningZone = ({ selected, setModalVisible }) => {
  return (
    <View style={formAssignmentStyles.mainViewLearningZone}>
      {selected === "Assignment" ? (
        <AssignmentForm selected={selected} setModalVisible={setModalVisible} />
      ) : selected === "Announce" ? (
        <AnnounceForm selected={selected} setModalVisible={setModalVisible} />
      ) : selected === "Record" ? (
        <RecordForm selected={selected} setModalVisible={setModalVisible} />
      ) : selected === "File" ? (
        <PostFileTeacher
          selected={selected}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </View>
  );
};

export default FormLearningZone;
