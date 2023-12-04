import axios from "axios";
import ipv4 from "../apiserver/ipv4";
/*
  This function is used to get the current existing plan of the user in database.
*/
const queryPlanner = async (email, setQueriedPlanner, setIsLoading) => {
  let result;
  if (setIsLoading != undefined) setIsLoading(true);

  try {
    const response = await axios.get(`${ipv4.golf}getPlanner?email=${email}`);

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      result = response.data; // result as a list of planner

      await setQueriedPlanner(result);

      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    throw error;
  } finally {
    if (setIsLoading != undefined) setIsLoading(false);
  }
};

export default queryPlanner;
