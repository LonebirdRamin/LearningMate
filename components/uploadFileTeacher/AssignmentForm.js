import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import FillBoxForm from "./FillBoxForm";
import InputFileLearning from "./InputFileLearning";
import CheckBoxLearning from "./checkBoxLearning";
import DateTimeLearning from "./DateTimeLearning";
import postAssignment from "../../backend/hooks/postAssignment";
import PostFile from "../../backend/hooks/submitFileStudent";
import PostFileTeacher from "../../backend/hooks/postFileTeacher";
import EditAssignment from "../../backend/hooks/editAssignment";

/* 
  This component used to show assignment form. 
*/

const AssignmentForm = ({
  type,
  setIsPosting,
  setModalVisible,
  classID,
  setIsLoading,
  assNameOld,
}) => {
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [file, setFile] = useState(null);
  const [showDate, handleShowDate] = useState(true);
  const [dateTime, handleDateTime] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileType = "Assignments";

  useEffect(() => {
    if (insertData !== null) {
      if (type === "insert") {
        postAssignment(
          insertData,
          setModalVisible,
          handleDateTime,
          onChangeInformation,
          onChangeTitle,
          setIsLoading,
          setIsPosting
        );
        PostFileTeacher(
          classID,
          fileType,
          file,
          setUploading,
          setFile,
          textTitle
        );
      } else if (type === "edit") {
        insertData["assNameOld"] = assNameOld;
        EditAssignment(
          insertData,
          setModalVisible,
          handleDateTime,
          onChangeInformation,
          onChangeTitle,
          setIsLoading,
          setIsPosting
        );
      }
      setModalVisible(false);
    }
  }, [insertData]);

  return (
    <View
      style={{
        width: "90%",
      }}
    >
      <FillBoxForm value={onChangeTitle} text={"Title"} />
      <FillBoxForm
        value={onChangeInformation}
        text={"Instruction (optional)"}
      />
      {/* Input file zone */}
      <InputFileLearning setFile={setFile} />
      <CheckBoxLearning
        type={type}
        handleShowDate={handleShowDate}
        showDate={showDate}
      />
      {!showDate && <DateTimeLearning handleDateTime={handleDateTime} />}
      <Text>{" "}</Text>
      {/* If the checkbox checked --> showDate*/}
      <View style={formAssignmentStyles.buttonMain}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            if (textTitle === "") {
              Alert.alert("Alert", "Please fill in your Assignment title", [
                { text: "Ok" },
              ]);
            } else {
              setInsertData({
                classID: classID,
                assName: textTitle,
                dueDate: dateTime,
                description: textInformation,
              });
            }
          }}
        >
          <Text style={formAssignmentStyles.buttonStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssignmentForm;
