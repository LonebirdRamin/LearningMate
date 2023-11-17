import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import FillBoxForm from "./FillBoxForm";
import InputFileLearning from "./InputFileLearning";
import CheckBoxLearning from "./checkBoxLearning";
import DateTimeLearning from "./DateTimeLearning";

const PostFileTeacher = ({ selected, setModalVisible }) => {
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [selectedFile, setFileSelected] = useState(null);
  const [insertData, setInsertData] = useState({});
  const email = "email eiei";
  useEffect(() => {
    console.log("---------File--------\n");
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
        text={"Information (optional)"}
      />
      {/* Input file zone */}
      <InputFileLearning setFileSelected={setFileSelected} />
      <View style={[formAssignmentStyles.buttonMain, { marginTop: "5%" }]}>
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

export default PostFileTeacher;
