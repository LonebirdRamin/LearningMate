import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import FillBoxForm from "./FillBoxForm";
import InputFileLearning from "./InputFileLearning";
import CheckBoxLearning from "./checkBoxLearning";
import DateTimeLearning from "./DateTimeLearning";

const AssignmentForm = ({ selected, setModalVisible }) => {
  //Don't forget to send "Class_ID" from LearningZone page
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [selectedFile, setFileSelected] = useState(null);
  const [showDate, handleShowDate] = useState(true);
  const [dateTime, handleDateTime] = useState(null);
  const [insertData, setInsertData] = useState({});
  const email = "khajonpong.akk@kmutt.ac.th";
  useEffect(() => {
    console.log("---------Assignment--------\n");
    console.log(insertData);
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
      <InputFileLearning setFileSelected={setFileSelected} />
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
                email: email,
                class_id: selected,
                assignment_name: textTitle,
                assignment_due_date: dateTime,
                assignment_description: textInformation,
                file: selectedFile,
              });
              setModalVisible(false);
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
