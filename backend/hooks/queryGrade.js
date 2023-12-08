import ipv4 from "../apiserver/ipv4";
/*
  This function will get all the specific student grade
*/
const queryGrade = async (email, setStudentGrade, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(`${ipv4.user}getGrades?email=${email}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();

    setStudentGrade(result);
  } catch (error) {
    alert("Query grades failed!", error.message);
  } finally {
    setLoading(false);
  }
};
export default queryGrade;
