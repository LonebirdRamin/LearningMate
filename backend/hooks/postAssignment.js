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
import { storage } from "./firebaseDB";
import { v4 } from "uuid";

const postAssignment = () => {
  const [classID, setClassID] = useState("");
  const [assName, setAssName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const navigation = useNavigation();

  const goInsert = async (classID, assName, dueDate, description) => {
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
        `${ipv4.mark}createAssignment`,
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

  const goBack = () => {
    navigation.goBack();
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

  const uploadFilesToFirebaseStorage = async () => {
    console.log("Starting uploadFilesToFirebaseStorage");
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };
};

export default postAssignment;
