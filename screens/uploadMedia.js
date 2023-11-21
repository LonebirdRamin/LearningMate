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
  FlatList
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../database/firebaseDB';

const UploadMedia = () => {
  const [classID, setClassID] = useState('CPE301'); // Set the initial classID
  const [fileType, setFileType] = useState('records'); // Set the initial fileType
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

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
    setClassID('CPE334'); // Update classID -> Change this path dynamically base on user input
    setFileType('Assignment'); // Update fileType -> Change this path dynamically base on user input
  
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

  const loadFiles = async () => {
    console.log('Loading files...')
    setClassID('CPE334'); // Update classID
    setFileType('Assignment'); // Update fileType
    // Line 103,104 -> Change it dynamically base on user input

    try {
      const filesRef = collection(db, 'storage', classID, fileType);
      const q = query(filesRef);

      const querySnapshot = await getDocs(q);

      const filesData = [];
      querySnapshot.forEach((doc) => {
        filesData.push({ id: doc.id, ...doc.data() });
      });

      console.log('Files loaded:', filesData)

      setFiles(filesData);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const downloadFile = async (item, classID, fileType) => {
    try {
      console.log('classID:', classID); // Add this line
      console.log('fileType:', fileType); // Add this line
      // Line 128,129 -> Change it dynamically base on user input
  
      const { filename } = item;
    
      const storageRef = ref(storage, `storage/${classID}/${fileType}/${filename}`);
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
      <TouchableOpacity style={styles.loadButton} onPress={loadFiles}>
        <Text style={styles.buttonText}>Load Files</Text>
      </TouchableOpacity>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text style={styles.fileName}>{item.filename}</Text>
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
})
