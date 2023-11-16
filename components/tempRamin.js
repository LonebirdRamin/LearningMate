import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../database/firebaseDB";
import { v4 as uuidv4 } from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-js";
import {
  storage,
  ref,
  uploadString,
  getDownloadURL,
} from "../backend/database/firebaseDB";

const TempRamin = () => {
  const [classID, setClassID] = useState("");
  const [assName, setAssName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);

  const storageRef = ref(getStorage(), "files/");
  const uploadFile = async () => {
    if (!fileToUpload) return;

    const fileRef = ref(storageRef, `${fileToUpload.name + uuidv4()}`);

    try {
      await uploadString(fileRef, fileToUpload.uri, "base64");

      const url = await getDownloadURL(fileRef);
      setFileUrls((prev) => [...prev, { name: fileToUpload.name, url }]);

      console.log(
        `File ${fileToUpload.name} uploaded to Firebase Storage successfully!`
      );
    } catch (error) {
      console.error("Error uploading file to Firebase Storage:", error);
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["*/*"],
      });

      setFileToUpload({
        uri: result.uri,
        name: result.name,
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Handle document picker cancellation
        console.log("Document picking canceled");
      } else {
        console.error("Error picking document:", error);
      }
    }
  };
  const goInsert = async () => {
    setLoading(true);
    try {
      const insertData = {
        classID,
        assName,
        dueDate,
        description,
      };

      console.log(insertData);

      const response = await axios.post(
        "http://192.168.1.33:5001/api/createAssignment",
        insertData
      );
      console.log(response.data);

      if (response.status === 201) {
        const result = response.data;
        console.log(result);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
      alert("Post assignment failed!" + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleDocumentSelection = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["*/*"],
  //     });

  //     if (result.type === "cancel") {
  //       // User canceled the document picking operation
  //       console.log("Document picking canceled");
  //     } else {
  //       // Handle the picked file
  //       console.log("File picked:", result);
  //     }
  //     setFileToUpload({
  //       uri: result.uri,
  //       name: result.name,
  //     });
  //   } catch (error) {
  //     // Handle other errors
  //     console.error("Error picking document:", error);
  //     Alert.alert("Error", "An error occurred while picking the document.");
  //   }
  //   // try {
  //   //   const documentResult = await DocumentPicker.getDocumentAsync({
  //   //     type: "*/*",
  //   //     multiple: true,
  //   //   });

  //   //   if (!documentResult.cancelled) {
  //   //     if (documentResult.assets && documentResult.assets.length > 0) {
  //   //       documentResult.assets.forEach((asset) => {
  //   //         console.log(
  //   //           `URI: ${asset.uri}\n` +
  //   //             `Name: ${asset.name}\n` +
  //   //             `Type: ${asset.mimeType}\n` +
  //   //             `Size: ${asset.size}`
  //   //         );
  //   //       });

  //   //       setFileSelected(documentResult.assets);
  //   //     } else {
  //   //       console.log("No assets selected");
  //   //     }
  //   //   } else {
  //   //     console.log("Document picking canceled");
  //   //   }
  //   // } catch (error) {
  //   //   console.log("Error while selecting file: ", error);
  //   // }
  // };

  // // const uploadFilesToFirebaseStorage = async () => {
  // //   console.log("Starting uploadFilesToFirebaseStorage");

  // //   if (fileSelected && fileSelected.length > 0) {
  // //     try {
  // //       await Promise.all(
  // //         fileSelected.map(async (file) => {
  // //           const fileName = file.name;
  // //           const fileRef = ref(storage, fileName); // Correct way to get file reference
  // //           console.log("File URI: " + file.uri);

  // //           const fileContent = await FileSystem.readAsStringAsync(file.uri, {
  // //             encoding: FileSystem.EncodingType.Base64,
  // //           });
  // //           const uint8Array = new Uint8Array(fileContent.length);
  // //           for (let i = 0; i < fileContent.length; i++) {
  // //             uint8Array[i] = fileContent.charCodeAt(i);
  // //           }

  // //           console.log("File Content:", fileContent);
  // //           console.log("File MIME Type:", file.mimeType);
  // //           console.log("File size: " + file.size);
  // //           await uploadBytes(fileRef, uint8Array, {
  // //             contentType: file.mimeType,
  // //           });
  // //           console.log(
  // //             `File ${fileName} uploaded to Firebase Storage successfully!`
  // //           );
  // //         })
  // //       );
  // //     } catch (error) {
  // //       console.error("Error uploading files to Firebase Storage:", error);
  // //       console.log(
  // //         "Error details:",
  // //         error.message,
  // //         error.code,
  // //         error.customData
  // //       );
  // //     }
  // //   } else {
  // //     console.error("No files selected to upload.");
  // //   }
  // // };
  // const uploadFilesToFirebaseStorage = async () => {
  //   if (!fileToUpload || typeof fileToUpload.uri !== "string") {
  //     console.error("Invalid file URI");
  //     return;
  //   }
  //   const fileRef = ref(storage, `files/${fileToUpload.name + uuid.v4()}`);
  //   try {
  //     console.log("click1");
  //     const fileContent = await FileSystem.readAsStringAsync(fileToUpload.uri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     const snapshot = await fileRef.putString(fileContent, "base64");

  //     const url = await snapshot.ref.getDownloadURL();
  //     setFileUrls((prev) => [...prev, { name: fileToUpload.name, url }]);

  //     console.log(
  //       `File ${fileToUpload.name} uploaded to Firebase Storage successfully!`
  //     );
  //   } catch (error) {
  //     console.error("Error uploading file to Firebase Storage:", error);
  //   }
  return (
    <View style={styles.container}>
      <Text>Class ID:</Text>
      <TextInput
        value={classID}
        style={styles.input}
        placeholder="Class ID"
        autoCapitalize="none"
        onChangeText={(text) => setClassID(text)}
      ></TextInput>
      <Text>Assignment name:</Text>
      <TextInput
        value={assName}
        style={styles.input}
        placeholder="Assignment name"
        autoCapitalize="none"
        onChangeText={(text) => setAssName(text)}
      ></TextInput>
      <Text>Due date:</Text>
      <TextInput
        value={dueDate}
        style={styles.input}
        placeholder="Due date"
        autoCapitalize="none"
        onChangeText={(text) => setDueDate(text)}
      ></TextInput>
      <Text>Description:</Text>
      <TextInput
        value={description}
        style={styles.input}
        placeholder="Description"
        autoCapitalize="none"
        onChangeText={(text) => setDescription(text)}
      ></TextInput>
      <Button title="File insert" onPress={pickFile} />
      {/* <Button title="Select File" onPress={handleDocumentSelection} /> */}
      <Button title="Insert" onPress={uploadFile} />
      {/* <Button title="Insert" onPress={() => { goInsert(); uploadFilesToFirebaseStorage(); }} /> */}
    </View>
  );
};

export default TempRamin;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
