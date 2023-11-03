import { View, Image, Text } from "react-native";
import React from "react";
import customStyles from "../styles/customStyles";
import Calendar from "../components/Calendar";

const Homepage = () => {
  return (
    <View
      style={[
        customStyles.customBox1,
        { borderTopLeftRadius: 0, borderTopRightRadius: 0, height: 382 },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={customStyles.pageTitle}>Calendar</Text>
        <Image source={require("../assets/icons/bell.png")}></Image>
      </View>
      <Text
        style={[
          customStyles.h4,
          { textAlign: "left", marginLeft: 24, marginBottom: 17 },
        ]}
      >
        Schedule
      </Text>
      <Calendar></Calendar>
    </View>
  );
};

export default Homepage;
