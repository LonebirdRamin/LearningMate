import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import FillBoxForm from "./FillBoxForm";
import InputFileLearning from "./InputFileLearning";
import CheckBoxLearning from "./checkBoxLearning";
import DateTimeLearning from "./DateTimeLearning";
import PostFile from "../../backend/hooks/postFile";

const PostFileTeacher = ({
  setIsPosting,
  setModalVisible,
  classID,
  setIsLoading,
}) => {
  const [textTitle, onChangeTitle] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  const [file, setFile] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileType = "Documents";

  useEffect(() => {
    if (insertData !== null) {
      console.log("---------File--------\n");
      console.log(insertData);
      PostFile(classID, fileType, file, setUploading, setFile, textTitle);
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
        text={"Information (optional)"}
      />
      {/* Input file zone */}
      <InputFileLearning setFile={setFile} />
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
                class_id: classID,
                document_name: textTitle,
                document_description: textInformation,
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

export default PostFileTeacher;
