import ipv4 from "../apiserver/ipv4";
/*
  This hook will get all the semester and year that the sepecific student has 
  been studying.
*/
const getSemesterYear = async (email, setSemYear, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${ipv4.kong}getSemesterYear?email=${email}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const current = await response.json();
    setSemYear(current);
  } catch (error) {
    console.error(error);
    alert("Get semester year failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getSemesterYear;
