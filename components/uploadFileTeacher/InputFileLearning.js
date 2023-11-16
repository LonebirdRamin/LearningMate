import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

const InputFileLearning = ({ setFileSelected }) => {
  const handleDocumentSelection = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: "*/*",
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
          setFileSelected(documentResult.assets);
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
        marginTop: "-4%",
      }}
    >
      <TouchableOpacity
        style={formAssignmentStyles.inputFile}
        onPress={handleDocumentSelection}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={formAssignmentStyles.image}
        />
        <Text style={formAssignmentStyles.textFile}> Attach file(s) </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputFileLearning;
