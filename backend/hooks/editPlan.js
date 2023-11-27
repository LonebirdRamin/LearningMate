import axios from "axios";
import ipv4 from "../apiserver/ipv4";
import moment from "moment";
const editPlan = async (
  editedData,
  setIsLoading,
  setEditModalVisible,
  setIsChanged
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`${ipv4.golf}editPlanner`, editedData);
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Edit planner failed!" + error.message);
  } finally {
    setIsLoading(false);
    setEditModalVisible(false);
    setIsChanged(true);
  }
};

export default editPlan;
