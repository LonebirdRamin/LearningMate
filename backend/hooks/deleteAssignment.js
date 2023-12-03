import axios from "axios";
import ipv4 from "../apiserver/ipv4";
import { Alert } from "react-native";

const DeleteAssignment = async (assName) => {
  // console.log(assName);
  try {
    console.log(assName);
    const response = await axios.delete(
      `${ipv4.mark}deleteAssignment?assName=${assName}`
    );
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Delete assignment failed!" + error.message);
  } finally {
    Alert.alert("Complete!", `The ${assName} is deleted.`);
  }
};

export default DeleteAssignment;
