import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FillBoxForm from "./FillBoxForm";
import InsertVideo from "./InsertVideo";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import InputFileLearning from "./InputFileLearning";
import PostFile from "../../backend/hooks/postFile";

/*
  This component handles the record posting on LearningZone. 
*/

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
  const fileType = "Records";

  useEffect(() => {
    if (insertData !== null) {
      PostFile(
        classID,
        fileType,
        video,
        setUploading,
        setVideo,
        title,
        setIsPosting
      );
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
