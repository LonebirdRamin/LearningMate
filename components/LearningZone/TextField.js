import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import Modal from "react-native-modal";
import ModalModified from "./ModalModified";
import DeleteFile from "../../backend/hooks/deleteFile";
import DeleteAssignment from "../../backend/hooks/deleteAssignment";
import DownloadFile from "../../backend/hooks/downloadFile";

const TextField = ({
  setText,
  text,
  setModalVisible,
  setModalModifiedVisible,
  assName,
  setAssName,
  classID,
  option, //Assignment/document/record
  setIsPosting,
  type, //Teacher or Student
  fileName,
}) => {
  // if (isDelete === true) {
  //   console.log("Delete");
  //   setModalVisible(false);
  // } else if (isDelete === false) {
  //   console.log("Cancel");
  // }
  // console.log(classID);

  const deleteAlert = () => {
    Alert.alert(
      "Delete",
      "Are you sure do you want to delete " + assName + "?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
        {
          text: "Delete",
          onPress: () => {
            if (option == "Assignments") {
              DeleteAssignment(assName);
            }
            DeleteFile(
              classID,
              option,
              assName,
              setAssName,
              setIsPosting,
              type,
            );
            setModalVisible(false);
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (text === "Delete") {
          // storage/${classID}/${Record/Assignment/Document}/${assName}
          deleteAlert();
          setAssName("");
        } else if (text === "Edit") {
          setModalVisible(false);
          setModalModifiedVisible(true);
          setText(text); //To send
        } else if (text === "Download") {
          // storage/${classID}/${Record/Assignment/Document}/${assName}
          console.log("Download some shit: " + assName);
          DownloadFile(
            classID,
            assName,
            setAssName,
            setIsPosting,
            fileName,
            option,
            type,
          );
          setModalVisible(false);
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
