import axios from "axios";
import ipv4 from "../apiserver/ipv4";

const EditAssignment = async (
  insertData,
  setModalVisible,
  setDate,
  onChangeInformation,
  onChangeTitle,
  setIsLoading,
  setIsPosting,
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`${ipv4.golf}editAssignment`, insertData);
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Edit assignment failed!" + error.message);
  } finally {
    setIsLoading(false);
    setModalVisible(false);
    setDate(new Date());
    onChangeInformation("");
    onChangeTitle("");
    setIsPosting(true);
  }
};

export default EditAssignment;
