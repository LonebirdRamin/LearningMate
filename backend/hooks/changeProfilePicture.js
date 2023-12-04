import { app, storage } from "../database/firebaseDB";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker
import * as FileSystem from "expo-file-system";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../database/firebaseDB";

/*
  This hooks is used for confirm the picture changing selection.
*/
const changeProfilePicture = async (
  id,
  file,
  setFile,
  setProfilePicSuccess,
  setIsPicLoading,
) => {
  setIsPicLoading(true);
  const path = `users/student/${id}`;

  try {
    // Delete existing files in the storage path
    const existingFilesRef = ref(storage, `storage/${path}`);
    const existingFilesRes = await listAll(existingFilesRef);

    // Delete each existing file
    await Promise.all(
      existingFilesRes.items.map(async (existingFileRef) => {
        await deleteObject(existingFileRef);
      }),
    );

    if (!file || !file.assets || file.assets.length === 0) {
      throw new Error("Invalid file selected");
    }

    const firstAsset = file.assets[0];

    const fileInfo = await FileSystem.getInfoAsync(firstAsset.uri);

    if (!fileInfo.exists || fileInfo.isDirectory) {
      throw new Error("Invalid file information");
    }

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fileInfo.uri, true);
      xhr.send(null);
    });

    const filename =
      firstAsset.name ||
      fileInfo.uri.substring(fileInfo.uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `storage/${path}/${filename}`);
    const firestoreRef = collection(db, "storage");
    const fileDocRef = doc(firestoreRef, filename);

    await uploadBytes(storageRef, blob, { contentType: firstAsset.mimeType });
    await setDoc(fileDocRef, {
      // Additional metadata if needed
      filename: filename,
      // ... (other metadata)
    });

    Alert.alert("Success");
    setFile(file);
    setProfilePicSuccess(false);
    setIsPicLoading(false);
  } catch (e) {
    Alert.alert("An error occurred", e.message);
  }
};

export default changeProfilePicture;
