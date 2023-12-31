import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import globleStyles from "../../styles/globleStyles";
import modalStyles from "../../styles/modalStyles";
import Modal from "react-native-modal";
import MainStudentAssignment from "./MainStudentAssignment";

/*
  This component handles student modal in student submission learningzone.
*/

const ModalSubmitAssignment = ({
  isVisible,
  setModalVisible,
  classID,
  email,
  assName, //assignment name
  setIsPosting,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [selected, setSelected] = useState(null);
  // console.log(assName + classID + email);
  // useEffect(() => {
  //   setSelected(null);
  // }, [isVisible]);

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
                <Text style={modalFillAssignmentStyles.text}>
                  Submit Assignment
                </Text>
                <MainStudentAssignment
                  setModalVisible={setModalVisible}
                  classID={classID}
                  email={email}
                  assName={assName}
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

export default ModalSubmitAssignment;
