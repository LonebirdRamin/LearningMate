import { View, Text, Dimensions } from "react-native";
import React from "react";
import globleStyles from "../styles/globleStyles";
import SettingBox from "../components/Setting/SettingBox";
import LandingStack from "../routes/LandingStack";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const menu = ["Log out"];

const Setting = ({ navigation }) => {
  const changePage = () => {
    navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
  };
  return (
    <View
      style={[
        globleStyles.pageContainer,
        { paddingTop: height * 0.05, paddingHorizontal: width * 0.09 },
      ]}
    >
      <SettingBox menu={menu} navigation={changePage} />
    </View>
  );
};

export default Setting;
