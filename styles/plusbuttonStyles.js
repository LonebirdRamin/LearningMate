import { StyleSheet, Text, View } from "react-native";
import React from "react";

const plusbuttonStyles = StyleSheet.create({
  mainView: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  greyLine: {
    zIndex: 0,
    width: "100%",
    height: 2,
    backgroundColor: "#4E4E61",
    justifyContent: "center",
    alignItems: "center",
  },
  addAssignmentBut: {
    zIndex: 2,
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#2E2E38",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    alignItems: "center",
  },
});

export default plusbuttonStyles;
