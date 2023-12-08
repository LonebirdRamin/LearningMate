import { Text, View, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import dropDownStyles from "../../styles/dropDownStyle";

/* 
  This component used to show the classID in dropdown menu.
*/

const DropdownAddAssignment = ({ setSelected, className }) => {
  const dataClass = [];
  //Convert object to array
  for (let i = 0; i < className.length; i++) {
    dataClass[i] = className[i].class_id;
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <SelectList
        data={dataClass}
        setSelected={setSelected}
        boxStyles={dropDownStyles.boxStyles}
        inputStyles={dropDownStyles.inputStyle}
        dropdownItemStyles={{
          marginTop: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
        dropdownTextStyles={dropDownStyles.dropdownTextStyles}
        search={false}
        placeholder="Select Class"
        dropdownStyles={dropDownStyles.dropBoxDownStyles}
        arrowicon={
          <FontAwesome name="chevron-down" size={12} color={"white"} />
        }
      />
    </View>
  );
};

export default DropdownAddAssignment;
