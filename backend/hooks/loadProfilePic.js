import { app, storage } from '../database/firebaseDB';
import React, { useState } from 'react';
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
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { collection, doc, setDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../database/firebaseDB';

const loadProfilePic= async(setPicUrl, path, setIsPicLoading)=>{

  setIsPicLoading(true);
  const storageRef = ref(storage, `storage/${path}`);

  try {
    const res = await listAll(storageRef);
    const fileList = await Promise.all(res.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      return {
        filename: itemRef.name,
        downloadURL, // Add download URL to the file object
        // Add other metadata as needed
      };
    }));
    setPicUrl(fileList[0]);
    
    setIsPicLoading(false)
  } catch (error) {
    console.error('Error listing files:', error);
  }
}

export default loadProfilePic;