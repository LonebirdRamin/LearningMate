import { storage } from "../database/firebaseDB";
import { ref, listAll, deleteObject } from "firebase/storage";

/* 
  This hook is for deleting file in Firebase 
  which can be Assignments, Documents, and Recording.
*/

const DeleteFile = async (
  classID,
  option,
  assName,
  setAssName,
  setIsPosting,
  type
) => {
  try {
    let filesRef = "";
    if (option === "Assignments") {
      filesRef = ref(
        storage,
        `storage/${classID}/${option}/${assName}/${type}`
      );
    } else {
      filesRef = ref(storage, `storage/${classID}/${option}/${assName}`);
    }
    const filesRes = await listAll(filesRef);

    // Delete each file in the path
    await Promise.all(
      filesRes.items.map(async (fileRef) => {
        await deleteObject(fileRef);
      })
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
