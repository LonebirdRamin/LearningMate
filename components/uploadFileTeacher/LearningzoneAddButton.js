import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import UploadFileTeacher from "./UploadFileTeacher";

const LearningzoneAddButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsVisible(true)}>
        <Image source={require("../../assets/icons/plusIcon.png")} />
      </Pressable>

      <UploadFileTeacher isVisible={isVisible} setModalVisible={setIsVisible} />
    </View>
  );
};

export default LearningzoneAddButton;
