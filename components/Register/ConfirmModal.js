import { View, Text, Modal } from "react-native";
import React from "react";
import modalStyle from "../../styles/modalStyles";
import AppButton from "../AppButton";
const ConfirmModal = () => {
  return (
    <Modal>
      <View style={modalStyle.modalContainer}>
        <Text style={modalStyle.headText}>Confirm registration</Text>
        <View style={modalStyle.buttonContainer}>
          <AppButton text="Confirm" textColor="white" />
          <AppButton />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
