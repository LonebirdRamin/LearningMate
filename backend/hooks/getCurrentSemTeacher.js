import ipv4 from "../apiserver/ipv4";

/* 
  This hook is for querying teacher's semester 
*/

const getCurrentSemTeacher = async (email, setCurrentSem, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.mark}getCurrentSemesterForTeacher?email=${email}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const current = await response.json();
    setCurrentSem(current[0]);
  } catch (error) {
    console.error(error);
    alert("Get Teacher personal info failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getCurrentSemTeacher;
