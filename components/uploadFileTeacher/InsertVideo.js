import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import { FontAwesome } from "@expo/vector-icons";

const InsertVideo = ({ setVideo }) => {
  const handleDocumentSelection = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        multiple: true,
      });

      if (!documentResult.cancelled) {
        // Check if assets array is present and not empty
        if (documentResult.assets && documentResult.assets.length > 0) {
          documentResult.assets.forEach((asset) => {
            console.log(
              `URI: ${asset.uri}\n` +
                `Title: ${asset.Title}\n` +
                `Type: ${asset.mimeType}\n` +
                `Size: ${asset.size}`
            );
          });

          // If needed, you can perform additional actions with the selected assets.
          // For example, you can store them in state using setFileSelected.
          setVideo(documentResult.assets);
        } else {
          console.log("No assets selected");
        }
      } else {
        console.log("Document picking canceled");
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
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
        onPress={handleDocumentSelection}
        activeOpacity={0.5}
      >
        <FontAwesome name="video-camera" size={16} color="#C1C1CD" />
        <Text style={formAssignmentStyles.textFile}> Import Video(s) </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertVideo;
