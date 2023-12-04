import React, { useState } from "react";
import { Pressable, View, Image, SafeAreaView } from "react-native";
import FillAssignmentModal from "./FillAssignmentModal";
import plusbuttonStyles from "../../styles/plusbuttonStyles";

/* 
  This component is about the "Plus" button which is used 
  for teacher to add assigment in HomePage.
*/

export const AddAssignmentButton = ({ email, setIsPosting }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={plusbuttonStyles.mainView}>
      <View style={plusbuttonStyles.greyLine}>
        <Pressable
          style={plusbuttonStyles.addAssignmentBut}
          onPress={() => setModalVisible(true)} //To visible the modal when press the button
        >
          <Image
            source={require("../../assets/icons/plusIcon.png")}
            style={{
              zIndex: 2,
            }}
          />
        </Pressable>
      </View>

      <FillAssignmentModal //Modal that show the assignment form.
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        email={email}
        setIsPosting={setIsPosting}
      ></FillAssignmentModal>
    </View>
  );
};
