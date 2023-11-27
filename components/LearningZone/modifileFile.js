import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import TextField from "./TextField";

const ModifileFile = ({
  isVisible,
  setModalVisible,
  setModalModifiedVisible,
  setText,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={modalFillAssignmentStyles.modal}
    >
      <View style={[modalFillAssignmentStyles.modalContent, { height: "25%" }]}>
        <View style={modalFillAssignmentStyles.center}>
          <View style={modalFillAssignmentStyles.barIcon} />
          <View style={modalFillAssignmentStyles.wrapper}>
            <View style={{ marginLeft: "5%", marginTop: "3.5%" }}>
              <TextField
                setText={setText}
                text={"Edit"}
                setModalVisible={setModalVisible}
                setModalModifiedVisible={setModalModifiedVisible}
              />
              <View style={{ backgroundColor: "#454545", height: 1 }} />
              <TextField
                setText={setText}
                text={"Delete"}
                setModalVisible={setModalVisible}
                setModalModifiedVisible={setModalModifiedVisible}
              />
              <View style={{ backgroundColor: "#454545", height: 1 }} />
              <TextField
                setText={setText}
                text={"Download"}
                setModalVisible={setModalVisible}
                setModalModifiedVisible={setModalModifiedVisible}
              />
            </View>
            {/* <TouchableOpacity style={modalFillAssignmentStyles.text}>
                <Text style={{ color: "white" }}>Edit</Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModifileFile;
