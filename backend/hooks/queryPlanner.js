import axios from "axios";
import ipv4 from "../apiserver/ipv4";

const queryPlanner = async (email, setQueriedPlanner, setIsLoading) => {
  let result;
  if (setIsLoading != undefined) setIsLoading(true);

  try {
    const response = await axios.get(`${ipv4.kong}getPlanner?email=${email}`);

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      result = response.data; // result as a list of planner

      await setQueriedPlanner(result);

      //   console.log(result[0].start_time);

      //   const dateTime = new Date(result[0].start_time)
      //   console.log(dateTime.toISOString("YYYY-MM-DD").slice(0,10));
      //   console.log(dateTime.toLocaleTimeString().slice(0,5));

      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (setIsLoading != undefined) setIsLoading(false);
  }
};

export default queryPlanner;
