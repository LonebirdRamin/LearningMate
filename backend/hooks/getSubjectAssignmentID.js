import ipv4 from "../apiserver/ipv4";

const getSubjectAssignmentID = async (
  assignment_name,
  setAssignmentData,
  setIsLoading,
) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `${ipv4.kong}getSubjectAssignmentID?assignment_name=${assignment_name}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    setAssignmentData(result[0]);
  } catch (error) {
    console.error(error);
    alert("Get subject assignmentID failed!" + error.message);
  } finally {
    setIsLoading(false);
  }
};

export default getSubjectAssignmentID;
