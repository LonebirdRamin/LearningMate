import { StyleSheet, Text, View } from "react-native";
import React from "react";

const modalFillAssignmentStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: "70%",
    backgroundColor: "#353542",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  barIcon: {
    backgroundColor: "#ffff",
    borderRadius: 25,
    width: 143,
    height: 3,
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 15,
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  loadingWidget: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#353542",
    width: "100%",
    height: "100%",
  },
});

export default modalFillAssignmentStyles;
