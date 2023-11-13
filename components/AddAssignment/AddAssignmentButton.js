import React, { useState } from "react";
import { Pressable, View, Image, SafeAreaView } from "react-native";
import FillAssignmentModal from "./FillAssignmentModal";
import plusbuttonStyles from "../../styles/plusbuttonStyles";

export const AddAssignmentButton = ({ email }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={plusbuttonStyles.mainView}>
      <View style={plusbuttonStyles.greyLine}>
        <Pressable
          style={plusbuttonStyles.addAssignmentBut}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../../assets/icons/plusIcon.png")}
            style={{
              zIndex: 2,
            }}
          />
        </Pressable>
      </View>

      <FillAssignmentModal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        email={email}
      ></FillAssignmentModal>
    </View>
  );
};
