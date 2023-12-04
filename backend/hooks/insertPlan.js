import axios from "axios";
import ipv4 from "../apiserver/ipv4";
import moment from "moment";
/*
  This hook will insert the new plan into the database.
*/
const insertPlan = async (
  insertData,
  setIsLoading,
  setNewPlan,
  setTitle,
  setDetail,
  setSelectedType,
  setDate,
  setModalVisible,
  setIsChanged
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`${ipv4.kong}createPlanner`, insertData);
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    alert("Add planner failed!" + error.message);
  } finally {
    setIsLoading(false);
    setNewPlan();
    setTitle("");
    setDetail("");
    setSelectedType("Work");
    setDate(new Date(moment().format()));
    setModalVisible(false);
    setIsChanged(true);
  }
};

export default insertPlan;
