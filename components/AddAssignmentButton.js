import React from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";

export const AddAssignmentButton = () => {
  return (
    <Pressable style={styles.addAssignmentBut}>
      <View style={styles.greyLine} />
      <Image source={require("../assets/icons/plusIcon.png")} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  greyLine: {
    width: 326,
    height: 2,
    backgroundColor: "#4E4E61",
  },
  addAssignmentBut: {
    width: 48,
    height: 48,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
