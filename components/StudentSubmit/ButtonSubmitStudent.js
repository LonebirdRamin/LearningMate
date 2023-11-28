import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";
import ModalSubmitAssignment from "./ModalSubmitAssignment";

const ButtonSubmitStudent = ({ classID, email }) => {
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
        classID={classID}
        email={email}
      />
    </View>
  );
};

export default ButtonSubmitStudent;
