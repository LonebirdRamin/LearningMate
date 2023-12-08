import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import UploadFileTeacher from "./UploadFileTeacher";

/*
  This component handles the button to pop-up the form modal.
*/

const LearningzoneAddButton = ({ classID, setIsPosting, setAnnounce }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsVisible(true)}>
        <Image source={require("../../assets/icons/plusIcon.png")} />
      </Pressable>

      <UploadFileTeacher
        isVisible={isVisible}
        setModalVisible={setIsVisible}
        classID={classID}
        setIsPosting={setIsPosting}
      />
    </View>
  );
};

export default LearningzoneAddButton;
