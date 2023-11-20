import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
const queryAssignment = async (
  email,
  setIsAssignmentLoading,
  setAssignmentData,
  setAssignNum
) => {
  setIsAssignmentLoading(true);
  setAssignNum("-");

  try {
    const response = await fetch(
      `${ipv4.golf}getStudentAssignment?email=${email}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const assignmentJSON = await response.json();
    setAssignmentData(assignmentJSON);
    setAssignNum(assignmentJSON.length);
  } catch (error) {
    console.error(error);
    alert("Query assignment failed!" + error.message);
  } finally {
    setIsAssignmentLoading(false);
  }
};

export default queryAssignment;
