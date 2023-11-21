import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "../uploadFileTeacher/FillBoxForm";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import InputFileLearning from "../uploadFileTeacher/InputFileLearning";

const MainStudentAssignment = ({ setModalVisible }) => {
  const [description, setDescription] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const email = "pannawat.duro@kmutt.ac.th";
  const classID = "CPE334";

  useEffect(() => {
    if (insertData !== null) {
      console.log("Insert Data: ");
      console.log(insertData);
    }
  }, [insertData]);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={formAssignmentStyles.text}>Description (optional)</Text>
      <TextInput
        style={[
          formAssignmentStyles.learningInput,
          { height: "60%", textAlignVertical: "top", paddingTop: "5%" },
        ]}
        inputMode="text"
        onChangeText={(text) => setDescription(text)}
      />
      <View
        style={{
          alignSelf: "flex-start",
          marginHorizontal: "5%",
        }}
      >
        <InputFileLearning setFileSelected={setFileSelected} />
      </View>
      <View style={[formAssignmentStyles.buttonMain, { width: "65%" }]}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            setInsertData({
              email: email,
              class_id: classID,
              description: description,
              file: fileSelected,
            });
            setModalVisible(false);
          }}
        >
          <Text style={formAssignmentStyles.buttonStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainStudentAssignment;
