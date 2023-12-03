import moment from "moment";
import ipv4 from "../apiserver/ipv4";
import axios from "axios";

const SubmitAssignment = async (
  insertData,
  setModalVisible,
  setIsLoading,
  setDescription,
  setCurrentDate
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      `${ipv4.kong}submitAssignment`,
      insertData
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
    alert("Submit Assignment failed!" + error.message);
  } finally {
    setIsLoading(false);
    setDescription("");
    setCurrentDate(new Date(moment().format()));
    setModalVisible(false);
  }
};

export default SubmitAssignment;
