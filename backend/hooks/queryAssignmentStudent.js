import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
import { Text } from "react-native";
/*
  This hook will get all the assignments that a student has, also will set the number of assignments.
*/
const queryAssignment = async (
  email,
  setIsAssignmentLoading,
  setAssignmentData,
  setAssignNum
) => {
  setIsAssignmentLoading(true);
  setAssignNum("-");
  setAssignmentData([<Text>Test</Text>]);
  try {
    const response = await fetch(
      `${ipv4.user}getStudentAssignment?email=${email}`,
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
