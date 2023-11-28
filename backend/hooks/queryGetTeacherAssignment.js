import { View, Text } from "react-native";
import React from "react";
import ipv4 from "../apiserver/ipv4";

const queryGetTeacherAssignment = async (
  email,
  setIsAssignmentLoading,
  setAssignData,
  setAssignmentNum
) => {
  setIsAssignmentLoading(true);
  setAssignmentNum("-");

  try {
    const response = await fetch(
      `${ipv4.mark}getTeacherAssignment?email=${email}`
    );
    console.log("query response: " + response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const assignmentJSON = await response.json();
    setAssignData(assignmentJSON);
    setAssignmentNum(assignmentJSON.length);
  } catch (error) {
    console.error(error);
    alert("Query assignment failed!" + error.message);
  } finally {
    setIsAssignmentLoading(false);
  }
};

export default queryGetTeacherAssignment;
