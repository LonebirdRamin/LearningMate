//Use for popup the when click AddAssignment button

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import modalStyles from "../../styles/modalStyles";
import DropdownAddAssignment from "./DropdownAddAssignment";
import FormAssignment from "./FormAssignment";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import customStyles from "../../styles/customStyles";
import globleStyles from "../../styles/globleStyles";
import queryClassTeacher from "../../backend/hooks/queryClassTeacher";
const FillAssignmentModal = ({
  isVisible,
  setModalVisible,
  email,
  setIsPosting,
}) => {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryClassTeacher(email, setIsLoading);
      setClassName(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelected(null);
  }, [isVisible]);

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
            {isLoading ? (
              <View style={modalFillAssignmentStyles.loadingWidget}>
                <View style={globleStyles.loading}>
                  <ActivityIndicator
                    size={100}
                    color="#F04E22"
                  ></ActivityIndicator>
                </View>
              </View>
            ) : (
              <View>
                <Text style={modalFillAssignmentStyles.text}>Assignment</Text>
                <DropdownAddAssignment
                  setSelected={setSelected}
                  className={className}
                />
                <FormAssignment
                  selected={selected}
                  setModalVisible={setModalVisible}
                  email={email}
                  setIsLoading={setIsLoading}
                  setIsPosting={setIsPosting}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FillAssignmentModal;
