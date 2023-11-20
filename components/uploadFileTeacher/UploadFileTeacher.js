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
import DropdownAddAssignment from "../AddAssignment/DropdownAddAssignment";
import modalStyles from "../../styles/modalStyles";
import FormAssignment from "../AddAssignment/FormAssignment";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import globleStyles from "../../styles/globleStyles";
import DropdownList from "./DropdownList";
import FormLearningZone from "./FormLearningZone";

const UploadFileTeacher = ({
  isVisible,
  setModalVisible,
  classID,
  setIsPosting,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);
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
                <Text style={modalFillAssignmentStyles.text}>Upload</Text>
                <DropdownList setSelected={setSelected} />
                <FormLearningZone
                  selected={selected}
                  setModalVisible={setModalVisible}
                  classID={classID}
                  setIsPosting={setIsPosting}
                  setIsLoading={setIsLoading}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UploadFileTeacher;
