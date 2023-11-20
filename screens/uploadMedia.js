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
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseDB';

const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      console.log('DocumentPicker result:', result);

      if (!result.canceled) {
        setFile(result);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const uploadMediaFile = async () => {
    setUploading(true);
    const classID = 'CPE301';
    const fileType = 'records'; // Assignment, records, or documents
  
    try {
      if (!file || !file.assets || file.assets.length === 0) {
        throw new Error('Invalid file selected');
      }
  
      const firstAsset = file.assets[0];
  
      console.log('File information:', firstAsset);
  
      const fileInfo = await FileSystem.getInfoAsync(firstAsset.uri);
  
      console.log('File info:', fileInfo);
  
      if (!fileInfo.exists || fileInfo.isDirectory) {
        throw new Error('Invalid file information');
      }
  
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', fileInfo.uri, true);
        xhr.send(null);
      });
  
    const filename = firstAsset.name || fileInfo.uri.substring(fileInfo.uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `storage/${classID}/${fileType}/${filename}`);
    const firestoreRef = collection(db, 'storage', classID, fileType);
    const fileDocRef = doc(firestoreRef, filename)

    await uploadBytes(storageRef, blob, { contentType: firstAsset.mimeType });
    await setDoc(fileDocRef, {
      // Additional metadata if needed
      filename: filename,
      // ... (other metadata)
    });

    setUploading(false);
    Alert.alert('Success');
    setFile(null);
  } catch (e) {
    console.log(e);
    setUploading(false);
    Alert.alert('An error occurred', e.message);
  }
};
  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickFile}>
        <Text style={styles.buttonText}>Pick a File</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {file && (
          <View>
            <Text style={{ color: 'white', marginBottom: 10 }}>
              Selected File: {file.name}
            </Text>
            {/* Conditionally render the image if it's an image file */}
            {file.assets && file.assets.length > 0 && file.assets[0].mimeType.startsWith('image/') && (
              <Image source={{ uri: file.assets[0].uri }} style={{ width: 300, height: 300 }} />
            )}
          </View>
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadMediaFile}>
          <Text style={styles.buttonText}>Upload File</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C23',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 150,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  }
})
