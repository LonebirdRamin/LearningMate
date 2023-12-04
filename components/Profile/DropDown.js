import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import profileStyles from "../../styles/profileStyle";
import dropDownGradeStyles from "../../styles/dropDownGradeStyles";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = [{ label: "All", value: "0" }];

const DropDown = ({ activityLabel, setSelectedSem }) => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={dropDownGradeStyles.container}>
      <Dropdown
        style={[dropDownGradeStyles.dropdown]}
        placeholderStyle={[
          profileStyles.text("#C1C1CD", height * 0.015, "500"),
        ]}
        selectedTextStyle={[
          profileStyles.text("#C1C1CD", height * 0.015, "500"),
          { textAlign: "center" },
        ]}
        itemTextStyle={profileStyles.text("#C1C1CD", height * 0.013, "500")}
        containerStyle={dropDownGradeStyles.listContainer}
        activeColor="#262630"
        autoScroll={false}
        data={activityLabel}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={activityLabel[0].label}
        value={value}
        onChange={(item) => {
          setValue(item.value);
          setSelectedSem(item.value);
        }}
      />
    </View>
  );
};

export default DropDown;
