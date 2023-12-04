import axios from "axios";
import ipv4 from "../apiserver/ipv4";

/* 
  This hook is for getting class infomation in database.
*/

const queryClass = async (email, setLoading) => {
  let result;
  try {
    const response = await axios.get(`${ipv4.mark}getClass?email=${email}`);

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      result = response.data;
      setLoading(false);
      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default queryClass;
