import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AddAssignmentButton } from "../components/AddAssignmentButton";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <Text
        style={{
          color: "white",
        }}
      >
        Test add AddAssignmentButton
      </Text>
      <AddAssignmentButton></AddAssignmentButton>
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
