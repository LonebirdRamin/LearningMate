import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import ModalSubmitAssignment from "./ModalSubmitAssignment";

const ButtonSubmitStudent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View
      style={{
        width: "70%",
      }}
    >
      <View style={formAssignmentStyles.buttonMain}>
        <TouchableOpacity
          style={formAssignmentStyles.confirmButton}
          onPress={() => setIsVisible(true)}
        >
          <Text style={formAssignmentStyles.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>

      <ModalSubmitAssignment
        isVisible={isVisible}
        setModalVisible={setIsVisible}
      />
    </View>
  );
};

export default ButtonSubmitStudent;
