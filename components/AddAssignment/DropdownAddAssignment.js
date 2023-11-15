import { Text, View, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import dropDownStyles from "../../styles/dropDownStyle";
import queryClassTeacher from "../../backend/hooks/queryClassTeacher";

const DropdownAddAssignment = ({ setSelected, className }) => {
  // const [className, setClassName] = useState([]);
  const dataClass = [];

  // useEffect(() => {
  //   queryClassTeacher(email, setIsLoading, setClassName);
  // }, []);

  //Convert object to array
  for (let i = 0; i < className.length; i++) {
    dataClass[i] = className[i].class_id;
  }
  // console.log(email, className, isLoad);
  // console.log(dataClass);
  const mockupData = [
    //If want to return from dropdown as key
    { key: "1", value: "CPE101" },
    { key: "2", value: "CPE223" },
    { key: "3", value: "CPE333" },
    { key: "4", value: "CPE371" },
    { key: "5", value: "CPE355" },
    { key: "6", value: "CPE342" },
    { key: "7", value: "CPE366" },
  ];
  const data = [
    //To return from dropdown as "string"
    "CPE101",
    "CPE223",
    "CPE333",
    "CPE371",
    "CPE355",
    "CPE342",
    "CPE366",
  ];
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
