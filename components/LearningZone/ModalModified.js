import { View, Text, Alert } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import modifiedModal from "../../styles/modifiedModal";

const ModalModified = ({
  text,
  isVisibleModalModified,
  setModalModifiedVisible,
}) => {
  // console.log(`ModalModified:  ${text}, ${isVisibleModalModified}!`);
  return (
    // <View>
    //   {text === "Delete" ? (
    //     Alert.alert("Delete", "Are you sure do you want to delete?", [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancle"),
    //       },
    //       {
    //         text: "Delete",
    //         onPress: () => console.log("Delete"),
    //       },
    //     ])
    //   ) : text === "Edit" ? (
    <Modal
      isVisible={isVisibleModalModified}
      onBackdropPress={() => setModalModifiedVisible(false)}
      style={modifiedModal.modal}
    >
      <View style={modifiedModal.mainview}>
        <View style={modifiedModal.center}>
          <Text style={modifiedModal.text}> {text} </Text>
        </View>
      </View>
    </Modal>
    //   ) : null}
    // </View>
  );
};

export default ModalModified;
