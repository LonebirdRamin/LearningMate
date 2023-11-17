import { View, Text } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import dropDownStyles from "../../styles/dropDownStyle";
import { FontAwesome } from "@expo/vector-icons";

const DropdownList = ({ setSelected }) => {
  const selectList = ["File", "Assignment", "Announce", "Record"];
  return (
    <View>
      <SelectList
        data={selectList}
        setSelected={setSelected}
        boxStyles={dropDownStyles.boxStyles}
        inputStyles={dropDownStyles.inputStyle}
        dropdownItemStyles={{
          marginTop: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
        dropdownTextStyles={[
          dropDownStyles.dropdownTextStyles,
          { fontSize: 18 },
        ]}
        search={false}
        placeholder="Select Option"
        dropdownStyles={dropDownStyles.dropBoxDownStyles}
        arrowicon={
          <FontAwesome name="chevron-down" size={12} color={"white"} />
        }
      />
    </View>
  );
};

export default DropdownList;
