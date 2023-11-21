import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import { FontAwesome } from "@expo/vector-icons";

const InsertVideo = ({ setVideo }) => {
  const [videoName, setVideoName] = useState("No video selected");

  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      console.log("DocumentPicker result:", result);
      setVideoName(result.assets[0].name);
      if (!result.canceled) {
        setVideo(result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        marginTop: "-2.5%",
        marginBottom: "5%",
      }}
    >
      <TouchableOpacity
        style={formAssignmentStyles.inputFile}
        onPress={pickFile}
        activeOpacity={0.5}
      >
        <FontAwesome name="video-camera" size={16} color="#C1C1CD" />
        <Text style={formAssignmentStyles.textFile}>
          {" "}
          Import Video(s) : {videoName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertVideo;
