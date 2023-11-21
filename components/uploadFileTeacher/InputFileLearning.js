import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

const InputFileLearning = ({ setFile }) => {
  const [fileName, setFileName] = useState("No File Selected");
  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      console.log("DocumentPicker result:", result);
      setFileName(result.assets[0].name);
      if (!result.canceled) {
        setFile(result);
      }
    } catch (error) {
      console.error("Error picking file:", error);
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
        onPress={pickFile}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={formAssignmentStyles.image}
        />
        <Text style={formAssignmentStyles.textFile} numberOfLines={1}>
          {" "}
          Attach file(s): {fileName}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputFileLearning;
