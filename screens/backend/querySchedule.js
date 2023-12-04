import axios from "axios";

const querySchedule = async (email, setLoading) => {
  try {
    // setLoading(true);
    const response = await axios.get(
      `http://192.168.1.75:5000/api/queryIdCard?email=${email}`,
    );

    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    console.log("TEST FINALLY");
  }
};

export default querySchedule;
