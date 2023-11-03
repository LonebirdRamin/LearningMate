import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import modalStyles from "../../styles/modalStyles";
import AppButton from "../AppButton";

function ConfirmModal({isModalVisible, toggleModal, setModalVisible}) {
  

  return (
    
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        
        animationInTiming={250}
        animationOutTiming={250}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={modalStyles.modal}
      >
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.center}>
            <View style={modalStyles.barIcon} />
            <View style={modalStyles.wrapper}>
              <Text style={modalStyles.text}>Comfirm registration</Text>
              <AppButton text="Confirm" textColor="white" height={60}/>
              <AppButton text="Decline" textColor="white" height={60} bgColor={false} style={{borderWidth: 0.4, borderColor: 'rgba(255,255,255, 0.3)'}}/>

            </View>
          </View>
        </View>
      </Modal>
    
  );
}

export default ConfirmModal;
