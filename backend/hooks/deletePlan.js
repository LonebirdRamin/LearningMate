import axios from "axios";
import ipv4 from "../apiserver/ipv4";
import { Alert } from "react-native";
const deletePlan = async (
  deleteData,
  setIsLoading,
  setEditModalVisible,
  setIsChanged
) => {
  setIsLoading(true);
  try {
    const response = await axios.delete(`${ipv4.greenTU}deletePlanner`, {
      data: deleteData,
    });
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Delete planner failed!" + error.message);
  } finally {
    setIsLoading(false);
    setEditModalVisible(false);
    setIsChanged(true);
    Alert.alert("Complete!", `The plan is deleted.`);
  }
};

export default deletePlan;
