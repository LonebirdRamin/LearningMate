import { storage } from "../database/firebaseDB";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { ref, getDownloadURL } from "firebase/storage";

/* 
  This hook is for downloading file in Firebase to local storage
  which can be Assignments, Documents, and Recording.
*/

const DownloadFile = async (
  classID,
  assName, //folderName
  setAssName,
  setIsPosting,
  fileName,
  option,
  type
) => {
  try {
    let path = "";
    // Set path to download file from
    if (option === "Assignments" && type === "teacher") {
      //Student is not implemented
      path = `${classID}/${option}/${assName}/${fileName}/${type}/${fileName}`;
    }
    path = `${classID}/${option}/${assName}/${fileName}`;
    console.log("path:", path);

    // set storage reference to storage/path/filename
    const storageRef = ref(storage, `storage/${path}/`);
    const url = await getDownloadURL(storageRef);

    const fileUri = FileSystem.documentDirectory + fileName;
    // const fileUri = `${FileSystem.documentDirectory}../Download/${fileName}`;
    const downloadResult = await FileSystem.downloadAsync(url, fileUri);

    if (downloadResult.status === 200) {
      Alert.alert("Download Successful", `File downloaded to: ${fileUri}`);
    } else {
      Alert.alert("Download Failed", "Unable to download the file.");
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    Alert.alert("Error", "An error occurred while downloading the file.");
  } finally {
    setAssName("");
    setIsPosting(true);
  }
};

export default DownloadFile;
