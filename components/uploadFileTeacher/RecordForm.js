import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "./FillBoxForm";
import InsertVideo from "./InsertVideo";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import InputFileLearning from "./InputFileLearning";
import PostFile from "../../backend/hooks/postFile";

const RecordForm = ({
  setIsPosting,
  setModalVisible,
  classID,
  setIsLoading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [video, setVideo] = useState(null);
  const [insertData, setInsertData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileType = "Record";

  useEffect(() => {
    if (insertData !== null) {
      // insertRecord(insertData ,setIsPosting,setModalVisible,classID,setIsLoading )
      PostFile(classID, fileType, video, setUploading, setVideo);
      setModalVisible(false);
    }
  }, [insertData]);

  return (
    <View>
      <FillBoxForm value={setTitle} text={"Title"} />
      <FillBoxForm value={setDesciption} text={"Description (optional)"} />
      <InsertVideo setVideo={setVideo} />
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
                class_id: classID,
                record_title: title,
                record_information: description,
                record_video: video,
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

export default RecordForm;
