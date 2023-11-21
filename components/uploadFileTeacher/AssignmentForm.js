import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import FillBoxForm from "./FillBoxForm";
import InputFileLearning from "./InputFileLearning";
import CheckBoxLearning from "./checkBoxLearning";
import DateTimeLearning from "./DateTimeLearning";
import postAssignment from "../../backend/hooks/postAssignment";
import PostFile from "../../backend/hooks/postFile";

const AssignmentForm = ({
  setIsPosting,
  setModalVisible,
  classID,
  setIsLoading,
}) => {
  //Don't forget to send "Class_ID" from LearningZone page
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [file, setFile] = useState(null);
  const [showDate, handleShowDate] = useState(true);
  const [dateTime, handleDateTime] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileType = "Assignment";

  useEffect(() => {
    if (insertData !== null) {
      // console.log("---------Inserting Assignment--------\n");
      // console.log(insertData);
      postAssignment(
        insertData,
        setModalVisible,
        handleDateTime,
        onChangeInformation,
        onChangeTitle,
        setIsLoading,
        setIsPosting
      );
      PostFile(classID, fileType, file, setUploading, setFile);
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
      <CheckBoxLearning handleShowDate={handleShowDate} showDate={showDate} />
      {!showDate && <DateTimeLearning handleDateTime={handleDateTime} />}
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
                // email: email,
                classID: classID,
                assName: textTitle,
                dueDate: dateTime,
                description: textInformation,
                // file: selectedFile,
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