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

const DeleteFile = async (
  classID,
  option,
  assName,
  setAssName,
  setIsPosting,
  type,
) => {
  try {
    let filesRef = "";
    // console.log(`storage/${classID}/${option}/${assName}`);
    // const newPath = `storage/${classID}/${option}/${assName}`;
    if (option === "Assignments") {
      filesRef = ref(
        storage,
        `storage/${classID}/${option}/${assName}/${type}`,
      );
    } else {
      filesRef = ref(storage, `storage/${classID}/${option}/${assName}`);
    }
    const filesRes = await listAll(filesRef);

    // Delete each file in the path
    await Promise.all(
      filesRes.items.map(async (fileRef) => {
        await deleteObject(fileRef);
      }),
    );

    console.log("Files in path deleted successfully");
    setAssName("");
    setIsPosting(true);
  } catch (error) {
    console.error("Error deleting files in path:", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

export default DeleteFile;
