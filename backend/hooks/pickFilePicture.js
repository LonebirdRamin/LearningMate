import * as DocumentPicker from 'expo-document-picker';
const pickFile = async (setFile, multiple, setProfilePicSuccess) => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: multiple,
      copyToCacheDirectory: true,
    });

    console.log("DocumentPicker result:", result);

    if (!result.canceled) {
      setFile(result);
      setProfilePicSuccess(true)
    }
    
  } catch (error) {
    console.error("Error picking file:", error);
  }
};

export default pickFile;