//Use for popup the when click AddAssignment button

import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import modalStyles from "../../styles/modalStyles";
import DropdownAddAssignment from "./DropdownAddAssignment";
import FormAssignment from "./FormAssignment";

const FillAssignmentModal = ({ isVisible, setModalVisible }) => {
  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={isVisible}
      // swipeDirection="down"
      // // onSwipeComplete={!isVisible}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={modalStyles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.center}>
          <View style={styles.barIcon} />
          <View style={styles.wrapper}>
            <Text style={styles.text}>Assignment</Text>
            <DropdownAddAssignment />
            <FormAssignment />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "60%",
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
});

export default FillAssignmentModal;
