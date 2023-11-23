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


const UploadMedia = () => {
  const [classID, setClassID] = useState('CPE301'); // Set the initial classID
  const [fileType, setFileType] = useState('records'); // Set the initial fileType
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState(''); // Set the initial path

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
    setClassID('CPE301'); // Update classID -> Change this path dynamically base on user input
    setFileType('records'); // Update fileType -> Change this path dynamically base on user input
    console.log("========UPLOAD MEDIA FILE========");
  
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
    // Change upload path here to upload to a different folder
    const storageRef = ref(storage, `storage/users/student/64070503471/${filename}`);
    // const storageRef = ref(storage, `storage/${classID}/${fileType}/${filename}`);
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

const loadFiles = async () => {
  console.log('Loading files...');

  // set path to load files from
  setPath(`users/student/64070503471`);
  console.log(path);

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
    setFiles(fileList);
    console.log(fileList);
  } catch (error) {
    console.error('Error listing files:', error);
  }
};

  const downloadFile = async (item, classID, fileType) => {
    try {
      // Set path to download file from
      setPath(`CPE241/Assignments/Test sent/teacher`)
      console.log('path:', path)
  
      const { filename } = item;
      
      // set storage reference to storage/path/filename
      const storageRef = ref(storage, `storage/${path}/${filename}`);
      const url = await getDownloadURL(storageRef);
    
      const fileUri = FileSystem.cacheDirectory + filename;
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);
    
      if (downloadResult.status === 200) {
        Alert.alert('Download Successful', `File downloaded to: ${fileUri}`);
      } else {
        Alert.alert('Download Failed', 'Unable to download the file.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'An error occurred while downloading the file.');
    }
  };

  const changeProfilePicture = async () => {
    setUploading(true);
    const newPath = `users/student/64070503471`;
    console.log("========CHANGE PROFILE PICTURE========", newPath);
    setPath(newPath); // Update the state
  
    try {
      // Delete existing files in the storage path
      const existingFilesRef = ref(storage, `storage/${path}`);
      const existingFilesRes = await listAll(existingFilesRef);
  
      // Delete each existing file
      await Promise.all(existingFilesRes.items.map(async (existingFileRef) => {
        await deleteObject(existingFileRef);
      }));
  
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
      const storageRef = ref(storage, `storage/${path}/${filename}`);
      const firestoreRef = collection(db, 'storage', classID, fileType);
      const fileDocRef = doc(firestoreRef, filename);
  
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.imageContainer}>
          {file && (
            <View>
              <Text style={{ color: 'white', marginBottom: 10 }}>
                Selected Picture: {file.name}
              </Text>
              {/* Conditionally render the image if it's an image file */}
              {file.assets && file.assets.length > 0 && file.assets[0].mimeType.startsWith('image/') && (
                <Image source={{ uri: file.assets[0].uri }} style={{ width: 300, height: 300 }} />
              )}
            </View>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={changeProfilePicture}>
            <Text style={styles.buttonText}>Change Picture</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loadButton} onPress={loadFiles}>
          <Text style={styles.buttonText}>Load Files</Text>
        </TouchableOpacity>
        <FlatList
          data={files}
          keyExtractor={(item) => item.filename}
          renderItem={({ item }) => (
            <View style={styles.fileItem}>
              <Text style={styles.fileName}>{item.filename}</Text>
              <Image
                style={styles.fileImage} // Define your image styles as needed
                source={{ uri: item.downloadURL }}
              />
              {/* Render additional file metadata as needed */}
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadFile(item, classID, fileType)}
              >
                <Text style={styles.buttonText}>Download File</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </ScrollView>
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
  },
  loadButton: {
    borderRadius: 5,
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 10,
  },
  fileItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  downloadButton: {
    borderRadius: 5,
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
  },
  fileImage: {
    width: 200, // Set the width of the image as needed
    height: 200, // Set the height of the image as needed
    resizeMode: 'cover', // Choose an appropriate resizeMode
    borderRadius: 5,
    marginTop: 10,
  },
})