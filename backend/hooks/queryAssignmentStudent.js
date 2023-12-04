import { useNavigation } from "@react-navigation/native";
import ipv4 from "../apiserver/ipv4";
import { Text } from "react-native";

/* 
  This hook is for getting student assignment by using 
  student email as parameter.
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
      `${ipv4.mark}getStudentAssignment?email=${email}`
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
