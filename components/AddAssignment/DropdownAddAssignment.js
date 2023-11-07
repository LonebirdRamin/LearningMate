import { Text, View, Image } from "react-native";
import React, { Component, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const DropdownAddAssignment = () => {
  const [selected, setSelected] = useState("");

  const mockupData = [
    { key: "1", value: "CPE101" },
    { key: "2", value: "CPE223" },
    { key: "3", value: "CPE333" },
    { key: "4", value: "CPE371" },
    { key: "5", value: "CPE355" },
    { key: "6", value: "CPE342" },
    { key: "7", value: "CPE366" },
  ];
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <SelectList
        data={mockupData}
        setSelected={setSelected}
        boxStyles={{
          marginTop: 20,
          borderRadius: 20,
          backgroundColor: "#494955",
          width: "60%",
          marginHorizontal: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 0,
        }}
        inputStyles={{
          color: "white",
          width: "50",
          fontSize: 17,
          fontWeight: "bold",
          marginHorizontal: 40,
        }}
        dropdownItemStyles={{
          marginTop: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
        dropdownTextStyles={{
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
        }}
        search={false}
        placeholder="Select Class"
        dropdownStyles={{
          marginHorizontal: "20%",
        }}
        // arrowIcon={
        //   <Image source={require("../assets/icons/bell.png")} color="white" />
        // }
      />
      <View>
        <Text>{console.log("DropDown key: " + selected)}</Text>
      </View>
    </View>
  );
};

export default DropdownAddAssignment;
