import { View, Text } from "react-native";
import React, { useEffect } from "react";
import CheckBox from "react-native-check-box";
import formAssignmentStyles from "../../styles/formAssignmentStyles";

/*  
  This component handle the checkbox 
*/
const CheckBoxLearning = ({ handleShowDate, showDate }) => {
  return (
    <View style={formAssignmentStyles.checkBox}>
      <CheckBox
        isChecked={showDate}
        onClick={() => handleShowDate(!showDate)}
        rightText="No Due Date"
        rightTextStyle={formAssignmentStyles.textCheckBox}
        checkBoxColor="#C1C1CD"
      />
    </View>
  );
};

export default CheckBoxLearning;
