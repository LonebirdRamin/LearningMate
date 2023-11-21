import ipv4 from "../apiserver/ipv4";
const getCurrentSemStudent = async (email, setCurrentSem, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.green}getCurrentSemesterForStudent?email=${email}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const current = await response.json();
    setCurrentSem(current[0]);
  } catch (error) {
    console.error(error);
    alert("Get student personal info failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getCurrentSemStudent;
