import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import DropDownPicker from 'react-native-dropdown-picker'
import profileStyles from '../../styles/profileStyle'
import dropDownGradeStyles from '../../styles/dropDownGradeStyles'
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = [
  { label: '1/2566', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropDown = () => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  
  

  return (
    <View style={ dropDownGradeStyles.container}>
      <Dropdown
        
        style={[ dropDownGradeStyles.dropdown]}
        placeholderStyle={[profileStyles.text("#C1C1CD", height * 0.015, "500")]}
        selectedTextStyle={profileStyles.text("#C1C1CD", height * 0.015, "500")}
        itemTextStyle={profileStyles.text("#C1C1CD", height * 0.013, "500")}
        containerStyle={ dropDownGradeStyles.listContainer}
        activeColor='#262630'
        autoScroll={false}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={data[0].label}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
       
      />
    </View>
  );
};

export default DropDown;

