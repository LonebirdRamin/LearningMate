import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import ipv4 from "../apiserver/ipv4";

const PostAnnouncement = async (
  insertData,
  setModalVisible,
  setIsLoading,
  setIsPosting,
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      `${ipv4.kong}postAnnouncement`,
      insertData
    );
    // Check the response status code to determine if it was successful
    if (response.status === 201) {
      const result = response.data;
      console.log(result);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    alert("Add planner failed!" + error.message);
  } finally {
    setIsLoading(false);
    setModalVisible(false);
    setIsPosting(true);
  }
};

export default PostAnnouncement;
