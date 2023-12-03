import { app, storage } from "../database/firebaseDB";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata, // Import getMetadata
  deleteObject,
} from "firebase/storage";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../database/firebaseDB";

const LoadFiles = async (type, data, setFiles, setIsLoading) => {
  // console.log("Loading files...");
  setIsLoading(true);
  const filetemp = [];
  let storageRef;
  let res;
  let fileList;

  try {
    for (let i = 0; i < data.length; i++) {
      storageRef = ref(
        storage,
        `storage/${data[i].class_id}/Assignments/${data[i].assignment_name}/${type}/`
      );
      res = await listAll(storageRef);
      fileList = await Promise.all(
        res.items.map(async (itemRef) => {
          const downloadURL = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef); // Get metadata for the file
          return {
            filename: itemRef.name,
            uploadDate: metadata.timeCreated, // Use timeCreated from metadata as creation date
            downloadURL,
            // Add other metadata as needed
          };
        })
      );
      if (fileList.length !== 0) {
        filetemp.push(...fileList);
      }
    }
    if (filetemp !== null) {
      // console.log(filetemp);
      setFiles(filetemp);
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

export default LoadFiles;
