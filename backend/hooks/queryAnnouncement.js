import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import ipv4 from "../apiserver/ipv4";

/* 
  This hook is for getting the announcement
*/

const queryAnnouncement = async (classID) => {
  let result;
  // setIsLoading(true);
  console.log("Test ClassID query");
  console.log(classID);
  try {
    const response = await axios.get(
      `${ipv4.mark}queryAnnouncement?classID=${classID}`
    );

    if (response.status === 200) {
      result = response.data;
      // console.log("Result in class: " + result);
      // setIsLoading(false);
      console.log("Result = " + result);
      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default queryAnnouncement;
