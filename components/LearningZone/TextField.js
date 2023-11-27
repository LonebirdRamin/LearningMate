import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import Modal from "react-native-modal";
import ModalModified from "./ModalModified";

const TextField = ({
  setText,
  text,
  setModalVisible,
  setModalModifiedVisible,
}) => {
  // if (isDelete === true) {
  //   console.log("Delete");
  //   setModalVisible(false);
  // } else if (isDelete === false) {
  //   console.log("Cancel");
  // }

  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure do you want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        text: "Delete",
        onPress: () => {
          console.log("Delete");
          setModalVisible(false);
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (text === "Delete") {
          deleteAlert();
        } else if (text === "Edit") {
          setModalVisible(false);
          setModalModifiedVisible(true);
          setText(text); //To send
        }
      }}
      style={{
        marginVertical: "3%",
      }}
    >
      <Text style={modalFillAssignmentStyles.textLearning}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextField;
