import { app, storage } from "../database/firebaseDB";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../database/firebaseDB";

const LoadRecord = async (data, setRecordFile, setIsLoading) => {
  setIsLoading(true);
  const storageRef = ref(storage, `storage/${data[0].class_id}/Records/`);

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
            const pathComponents = itemRef.fullPath.split("/");
            const folderName =
              pathComponents.length > 1
                ? pathComponents[pathComponents.length - 2]
                : null;

            return {
              filename: itemRef.name,
              uploadDate: metadata.timeCreated,
              downloadURL,
              folderName, // Add the folderName property
              // Add other metadata as needed
            };
          })
        );
      })
    );

    // Flatten the array of arrays into a single array
    const flattenedFileList = fileList.flat();
    // console.log(flattenedFileList);
    setRecordFile(flattenedFileList);
    setIsLoading(false);
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

export default LoadRecord;
