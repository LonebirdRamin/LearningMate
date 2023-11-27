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

const LoadDocument = async (data, setFiles, setIsLoading) => {
  setIsLoading(true);
  const storageRef = ref(storage, `storage/${data[0].class_id}/Documents/`);

  try {
    const topDirectories = await listAll(storageRef);
    const fileList = await Promise.all(
      topDirectories.prefixes.map(async (prefix) => {
        const subdirectoryRef = ref(storage, prefix.fullPath);
        const filesInSubdirectory = await listAll(subdirectoryRef);
        return Promise.all(
          filesInSubdirectory.items.map(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            return {
              filename: itemRef.name,
              uploadDate: metadata.timeCreated,
              downloadURL,
              // Add other metadata as needed
            };
          })
        );
      })
    );

    // Flatten the array of arrays into a single array
    const flattenedFileList = fileList.flat();
    // console.log(flattenedFileList);
    setFiles(flattenedFileList);
    setIsLoading(false);
    // console.log("Array : ", flattenedFileList);
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

export default LoadDocument;
