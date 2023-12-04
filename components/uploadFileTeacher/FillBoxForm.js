import { View, Text, TextInput } from "react-native";
import React from "react";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

/*
  This component handle the text inputting box
*/

const FillBoxForm = ({ value, text }) => {
  return (
    <View style={formAssignmentStyles.mainboxLearning}>
      <Text style={formAssignmentStyles.text}>{text}</Text>
      <TextInput
        style={formAssignmentStyles.learningInput}
        inputMode="text"
        onChangeText={(text) => value(text)}
      />
    </View>
  );
};

export default FillBoxForm;
