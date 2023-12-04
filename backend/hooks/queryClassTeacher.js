import axios from "axios";
import ipv4 from "../apiserver/ipv4";

const queryClassTeacher = async (email, setIsLoading) => {
  let result;
  setIsLoading(true);

  try {
    const response = await axios.get(
      `${ipv4.golf}getClassTeacher?email=${email}`,
    );
    // console.log("ClassName response: " + response);

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      result = response.data;
      // console.log("Result in class: " + result);
      setIsLoading(false);
      console.log("Result = " + result);
      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default queryClassTeacher;
