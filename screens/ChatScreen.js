import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AddAssignmentButton } from "../components/AddAssignment/AddAssignmentButton";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadFileTeacher from "../components/uploadFileTeacher/UploadFileTeacher";
import LearningzoneAddButton from "../components/uploadFileTeacher/LearningzoneAddButton";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <Text
        style={{
          color: "white",
        }}
      >
        Test add upload file on learning zone
      </Text>
      <LearningzoneAddButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C23",
  },
});

export default ChatScreen;
