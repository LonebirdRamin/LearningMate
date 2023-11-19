import axios from 'axios';
import { useEffect } from 'react'

const querySchedule = async (email, setLoading) => {
  try {
    // setLoading(true);
    const response = await axios.get(`http://69.69.69.4:5001/api/checkRole?email=${email}`);
    console.log(response.data);
    // Check the response status code to determine if it was successful
    if (response.status === 200) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    throw error;
  } finally {
    console.log("TEST FINALLY");
  }
};

export default querySchedule;