import { View, Text, Alert } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import modifiedModal from "../../styles/modifiedModal";
import FormLearningZone from "../uploadFileTeacher/FormLearningZone";
import modalStyles from "../../styles/modalStyles";
import modalFillAssignmentStyles from "../../styles/modalFillAssignmentStyles";
import FormAssignment from "../AddAssignment/FormAssignment";
import AssignmentForm from "../uploadFileTeacher/AssignmentForm";

const ModalModified = ({
  text,
  isVisibleModalModified,
  setModalModifiedVisible,
  data,
  assName,
  setIsLoading,
  setIsPosting,
  setAssName,
  classID,
}) => {
  return (
    <Modal
      isVisible={isVisibleModalModified}
      onBackdropPress={() => {
        setModalModifiedVisible(false);
        setAssName("");
      }}
      onBackButtonPress={() => {
        setModalModifiedVisible(false);
        setAssName("");
      }}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={modalStyles.modal}
    >
      <View style={[modalFillAssignmentStyles.modalContent, { height: "65%" }]}>
        <View style={modalFillAssignmentStyles.center}>
          <View style={modalFillAssignmentStyles.barIcon} />
          <View style={modalFillAssignmentStyles.wrapper}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={[modalFillAssignmentStyles.text, { marginBottom: "5%" }]}
              >
                {text}
              </Text>
              <AssignmentForm
                type={"edit"}
                setIsPosting={setIsPosting}
                setModalVisible={setModalModifiedVisible}
                classID={classID}
                setIsLoading={setIsLoading}
                assNameOld={assName}
              />
              {/* <FormLearningZone
                setModalVisible={setModalVisible}
                classID={classID}
                setIsPosting={setIsPosting}
                setIsLoading={setIsLoading}
              /> */}
            </View>
          </View>
        </View>
      </View>
      {/* <View style={modifiedModal.mainview}>
        <View style={modifiedModal.center}>
          <Text style={modifiedModal.text}> {text} </Text>
          <FormLearningZone
            selected={"Assignment"}
            setModalModifiedVisible={setModalModifiedVisible}
            classID={data.class_id}
            setIsPosting={setIsPosting}
            setIsLoading={setIsLoading}
          />
        </View>
      </View> */}
    </Modal>
    //   ) : null}
    // </View>
  );
};

export default ModalModified;
