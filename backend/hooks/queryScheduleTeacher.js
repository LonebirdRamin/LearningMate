import axios from "axios";
import ipv4 from "../apiserver/ipv4";
/*
  This hook will get all classes that the teacher had taught in, plus date and time of the class.
*/
const queryScheduleTeacher = async (
  email,
  setQueriedSchedule,
  setIsLoading,
) => {
  let result;
  try {
    const response = await axios.get(
      `${ipv4.golf}getTeacherSchedule?email=${email}`,
    );

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      setQueriedSchedule(response.data);
      setLoading(false);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default queryScheduleTeacher;
