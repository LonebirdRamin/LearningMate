import * as DocumentPicker from "expo-document-picker";
/*
  This hook will be used to access the user file selection.
*/
const pickFile = async (setFile, multiple, setProfilePicSuccess) => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: multiple,
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFile(result);
      setProfilePicSuccess(true);
    }
  } catch (error) {}
};

export default pickFile;
