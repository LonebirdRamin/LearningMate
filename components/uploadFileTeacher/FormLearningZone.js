import { View, Text } from "react-native";
import React from "react";
import AssignmentForm from "./AssignmentForm";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import AnnounceForm from "./AnnounceForm";
import RecordForm from "./RecordForm";
import PostFileTeacher from "./PostFileTeacher";

/*
  This component handles the form type on the learningZoneTeacher
*/

const FormLearningZone = ({
  selected,
  setModalVisible,
  classID,
  setIsPosting,
  setIsLoading,
}) => {
  return (
    <View style={formAssignmentStyles.mainViewLearningZone}>
      {selected === "Assignment" ? (
        <AssignmentForm
          type={"insert"}
          setIsPosting={setIsPosting}
          setModalVisible={setModalVisible}
          classID={classID}
          setIsLoading={setIsLoading}
          assNameOld={""}
        />
      ) : selected === "Announce" ? (
        <AnnounceForm
          setIsPosting={setIsPosting}
          setModalVisible={setModalVisible}
          classID={classID}
          setIsLoading={setIsLoading}
        />
      ) : selected === "Record" ? (
        <RecordForm
          setIsPosting={setIsPosting}
          setModalVisible={setModalVisible}
          classID={classID}
          setIsLoading={setIsLoading}
        />
      ) : selected === "File" ? (
        <PostFileTeacher
          setIsPosting={setIsPosting}
          setModalVisible={setModalVisible}
          classID={classID}
          setIsLoading={setIsLoading}
        />
      ) : null}
    </View>
  );
};

export default FormLearningZone;
