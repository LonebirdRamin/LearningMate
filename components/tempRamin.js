import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import firebase from "firebase/app"; // Import only the app module
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../database/firebaseDB";
import { v4 } from "uuid";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-js";

const TempRamin = () => {
  const [classID, setClassID] = useState("");
  const [assName, setAssName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [urls, setUrls] = useState([]);

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

  const handleDocumentSelection = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!documentResult.cancelled) {
        if (documentResult.assets && documentResult.assets.length > 0) {
          documentResult.assets.forEach((asset) => {
            console.log(
              `URI: ${asset.uri}\n` +
                `Name: ${asset.name}\n` +
                `Type: ${asset.mimeType}\n` +
                `Size: ${asset.size}`
            );
          });

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

  // const uploadFilesToFirebaseStorage = async () => {
  //   console.log("Starting uploadFilesToFirebaseStorage");
  //   if (fileSelected == null) return;
  //   console.log("Upload: ");
  //   const fileRef = ref(storage, `${fileSelected.name + v4()}`);
  //   console.log("fileRed: " + fileRef);
  //   uploadBytes(fileRef, fileSelected).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };
  const uploadFilesToFirebaseStorage = async () => {
    console.log("Starting uploadFilesToFirebaseStorage");

    if (fileSelected && fileSelected.length > 0) {
      try {
        await Promise.all(
          fileSelected.map(async (file) => {
            const fileName = file.name;
            const fileRef = ref(storage, fileName); // Correct way to get file reference
            console.log("File URI: " + file.uri);

            const fileContent = await FileSystem.readAsStringAsync(file.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            const uint8Array = new Uint8Array(fileContent.length);
            for (let i = 0; i < fileContent.length; i++) {
              uint8Array[i] = fileContent.charCodeAt(i);
            }

            console.log("File Content:", fileContent);
            console.log("File MIME Type:", file.mimeType);
            console.log("File size: " + file.size);
            await uploadBytes(fileRef, uint8Array, {
              contentType: file.mimeType,
            });
            console.log(
              `File ${fileName} uploaded to Firebase Storage successfully!`
            );
          })
        );
      } catch (error) {
        console.error("Error uploading files to Firebase Storage:", error);
        console.log(
          "Error details:",
          error.message,
          error.code,
          error.customData
        );
      }
    } else {
      console.error("No files selected to upload.");
    }
  };

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
      <Button title="File insert" onPress={handleDocumentSelection} />
      {/* <Button title="Select File" onPress={handleDocumentSelection} /> */}
      <Button title="Insert" onPress={uploadFilesToFirebaseStorage} />
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
