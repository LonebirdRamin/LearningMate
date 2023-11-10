import { View, Text, Image } from "react-native";
import React from "react";
import addButtonStyles from "../../styles/addButtonStyles";
import { TouchableOpacity } from "react-native";

const AddPlannerButton = ({handlePress}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
    >
      <View style={addButtonStyles.container}>
        <View style={addButtonStyles.line} />
        <View style={addButtonStyles.plusBox}>
          <Image
            style={addButtonStyles.plusSize}
            resizeMode="contain"
            source={require("../../assets/icons/plusIcon.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddPlannerButton;
