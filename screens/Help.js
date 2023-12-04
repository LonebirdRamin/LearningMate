import { View, Text, Dimensions } from "react-native";
import React from "react";
import globleStyles from "../styles/globleStyles";
import SettingBox from "../components/Setting/SettingBox";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const menu = ["Support Center", "Report Problem"];

const Help = () => {
  return (
    <View
      style={[
        globleStyles.pageContainer,
        { paddingTop: height * 0.05, paddingHorizontal: width * 0.09 },
      ]}
    >
      <SettingBox menu={menu} />
    </View>
  );
};

export default Help;
