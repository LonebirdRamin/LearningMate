import axios from "axios";
import ipv4 from "../apiserver/ipv4";

const querySchedule = async (email, setLoading, setQueriedSchedule) => {
  try {
    const response = await axios.get(
      `${ipv4.kong}getStudentSchedule?email=${email}`
    );

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      result = response.data.filter((item) => item.date_name === day);
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

export default querySchedule;
