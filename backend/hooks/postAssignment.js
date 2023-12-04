import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import firebase from "firebase/app"; // Import only the app module
import "firebase/storage";
import { storage } from "@react-native-firebase/storage";
import { getStorage, ref, uploadBytes } from "@react-native-firebase/storage";
import { v4 } from "uuid";
import ipv4 from "../apiserver/ipv4";

/* 
  This hook is for Teacher to posting assignment in the database
*/

const postAssignment = async (
  insertData,
  setModalVisible,
  setDate,
  onChangeInformation,
  onChangeTitle,
  setIsLoading,
  setIsPosting
) => {
  console.log(insertData);
  setIsLoading(true);
  try {
    const response = await axios.post(
      `${ipv4.mark}createAssignment`,
      insertData
    );
    console.log("Response From Post Ass: ", response.data);

    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
    const assignmentIDResponse = await fetch(`${ipv4.mark}getAssignmentID`);
    const assignmentIDData = await assignmentIDResponse.json();
    const maxAssID = assignmentIDData.maxAssignmentId;

    console.log("InsertData classID:" + insertData.classID);
    const queryStudentResponse = await fetch(
      `${ipv4.mark}getStudent?classID=${insertData.classID}`
    );

    const queryStudentData = await queryStudentResponse.json();

    const studentIds = queryStudentData.map((student) => student.student_id);
    console.log(studentIds);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const initialStatus = 0;
    const studentEachClass = studentIds.map((num) => [
      num.toString(),
      maxAssID,
      initialStatus,
      formattedDate,
    ]);
    console.log("STUDENT EACH CLASS:", studentEachClass);

    const generateStatusResponse = await axios.post(
      `${ipv4.mark}generateStatus`,
      { dataToInsert: studentEachClass }
    );
    if (generateStatusResponse.status === 201) {
      const result = generateStatusResponse.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Post assignment failed!" + error.message);
  } finally {
    setIsLoading(false);
    setModalVisible(false);
    setDate(new Date());
    onChangeInformation("");
    onChangeTitle("");
    setIsPosting(true);
  }
};

export default postAssignment;
