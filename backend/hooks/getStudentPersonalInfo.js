import ipv4 from "../apiserver/ipv4";

const getStudentPersonalInfo = async (email, setPerInfo, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.kong}getStudentPersonalInfo?email=${email}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const personalInfoJASON = await response.json();
    setPerInfo(personalInfoJASON[0]);
  } catch (error) {
    console.error(error);
    alert("Get student personal info failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getStudentPersonalInfo;
