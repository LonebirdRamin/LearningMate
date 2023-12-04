import axios from "axios";
import ipv4 from "../apiserver/ipv4";
/*
  This hook will get all classes that the student had enrolled in, plus date and time of the class.
*/
const querySchedule = async (email, setQueriedSchedule, setLoading) => {
  try {
    const response = await axios.get(
      `${ipv4.golf}getStudentSchedule?email=${email}`,
    );

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      await setQueriedSchedule(response.data);
      if (setLoading != undefined) setLoading(false);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default querySchedule;
