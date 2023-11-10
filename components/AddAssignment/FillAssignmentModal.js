//Use for popup the when click AddAssignment button

import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import modalStyles from "../../styles/modalStyles";
import DropdownAddAssignment from "./DropdownAddAssignment";
import FormAssignment from "./FormAssignment";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";

const FillAssignmentModal = ({ isVisible, setModalVisible }) => {
  const [selected, setSelected] = useState("");

  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={isVisible}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={modalStyles.modal}
    >
      <View style={modalFillAssignmentStyles.modalContent}>
        <View style={modalFillAssignmentStyles.center}>
          <View style={modalFillAssignmentStyles.barIcon} />
          <View style={modalFillAssignmentStyles.wrapper}>
            <Text style={modalFillAssignmentStyles.text}>Assignment</Text>
            <DropdownAddAssignment setSelected={setSelected} />
            <FormAssignment
              selected={selected}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FillAssignmentModal;
