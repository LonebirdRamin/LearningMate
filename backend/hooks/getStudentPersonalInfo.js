import ipv4 from "../apiserver/ipv4";
/*
  This hook gets the personal information of the specific student.
*/
const getStudentPersonalInfo = async (email, setPerInfo, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.user}getStudentPersonalInfo?email=${email}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const personalInfoJASON = await response.json();
    setPerInfo(personalInfoJASON[0]);
  } catch (error) {
    alert("Get student personal info failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getStudentPersonalInfo;
