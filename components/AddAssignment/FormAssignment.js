// This file is for user to input the name and information by text, file, and due date
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
// import DocumentPicker from "react-native-document-picker";

const FormAssignment = () => {
  const [textName, onChangeName] = useState("");
  const [textInformation, onChangeInformation] = useState("");
  // const [multipleFile, setMultipleFile] = useState([]);

  // const handleDocumentSelection = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       //Try to pick the document ==> if fail; warn error
  //       type: [DocumentPicker.types.allFiles], // To accept all file tyoe
  //       presentationStyle: "fullScreen", //await make this DocumentPicker run in the background
  //     });
  //     setMultipleFile(response); //To set the state to show multiple file attributes
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log("Canceled from single doc picker");
  //     } else {
  //       console.log("Unknown ErrorL " + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeName}
        value={textName}
      />

      <Text style={styles.text}>Information</Text>
      <TextInput
        style={styles.input}
        inputMode="text"
        onChangeText={onChangeInformation}
        value={textInformation}
      />
      <TouchableOpacity
        style={styles.inputFile}
        onPress={() => {
          console.log("Clicked!");
        }}
        activeOpacity={0.5}
      >
        <Image
          source={require("../../assets/icons/clipboardFile.png")}
          style={styles.fileImage}
        />
        <Text style={styles.textFile}> Attach file(s) </Text>
      </TouchableOpacity>

      <View style={styles.inputFile}>
        <Text></Text>
      </View>

      <Text>{console.log("Name: " + textName)}</Text>
      <Text>{console.log("Information: " + textInformation)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    paddingLeft: 15,
    color: "white",
    width: "90%",
    marginHorizontal: "15%",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: 55,
    marginBottom: 15,
  },
  inputFile: {
    marginTop: 15,
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  fileImage: {
    width: 16,
    height: 16,
  },
  text: {
    color: "#C1C1CD",
    paddingBottom: 8,
    alignSelf: "stretch",
    marginHorizontal: "5%",
    fontSize: 15,
  },
  textFile: {
    color: "#C1C1CD",
    fontSize: 15,
  },
});

export default FormAssignment;
