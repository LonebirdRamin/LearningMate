import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "./FillBoxForm";
import InsertVideo from "./InsertVideo";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import InputFileLearning from "./InputFileLearning";

const RecordForm = ({ selected, setModalVisible }) => {
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [video, setVideo] = useState(null);
  const [insertData, setInsertData] = useState({});
  const [fileSelected, setFileSelected] = useState(null);
  const email = "temp email";

  useEffect(() => {
    console.log("---------Record--------\n");
    console.log(insertData);
  }, [insertData]);

  return (
    <View>
      <FillBoxForm value={setTitle} text={"Title"} />
      <FillBoxForm value={setDesciption} text={"Description (optional)"} />
      <InsertVideo setVideo={setVideo} />
      <InputFileLearning setFileSelected={setFileSelected} />
      <View style={[formAssignmentStyles.buttonMain, { marginTop: "5%" }]}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => {
            if (title === "") {
              Alert.alert("Alert", "Please fill in your title", [
                { text: "Ok" },
              ]);
            } else {
              setInsertData({
                email: email,
                class_id: selected,
                record_title: title,
                record_information: description,
                record_file: fileSelected,
                record_video: video,
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

export default RecordForm;
