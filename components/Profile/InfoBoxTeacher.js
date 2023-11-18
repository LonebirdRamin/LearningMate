import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";
import profileStyles from "../../styles/profileStyle";
import uuid from "react-native-uuid";
// const profile = require("../../assets/icons/Profile/profile.png")
const data = {
  id: 64070503433,
  eduLevel: "Bechelor's Degree",
  Faculty: "Engineering",
  Department: "Computer Engineering",
};

const grade = {
  last: 3.91,
  GPAX: 3.87,
};

const user = require("../../assets/icons/Profile/user.png");
const education = require("../../assets/icons/Profile/graduation.png");
const faculty = require("../../assets/icons/Profile/layer.png");
const department = require("../../assets/icons/Profile/hierarchy.png");

const InfoBoxTeacher = ({ header, data, handlePress }) => {
  //   let prepData =
  //     header === "Personal Info"
  //       ? Object.values(data).slice(1)
  //       : header === "Activity"
  //       ? Object.values(data)
  //       : data;
  let prepData = data;
  let i = 0;
  const icon = [user, education, faculty, department];
  const subHeader =
    header === "Personal Info"
      ? ["Teacher ID", "Education level", "Faculty", "Department"]
      : [];
  return (
    // Start - entire infobox
    <View>
      {/*Start - Header of infobox */}
      <Text style={customStyles.h2}>{header}</Text>
      {/*Start - Header of infobox */}

      <TouchableOpacity
        style={profileStyles.infoContainer}
        onPress={() => handlePress()}
      >
        {/* Start - Each row infomation */}
        {prepData.map((item) => {
          return (
            <View key={uuid.v4()}>
              <View style={profileStyles.gap} />

              <View style={profileStyles.infoRow}>
                <Image
                  style={profileStyles.iconSize}
                  resizeMode="contain"
                  source={icon[i]}
                />
                {/*Start - text container */}
                <View style={profileStyles.textContainer}>
                  <Text style={customStyles.h2}>{subHeader[i++]}</Text>
                  <Text style={profileStyles.text("#A2A2B5", 12, "500")}>
                    {item}
                    {header === "Activity" ? " hrs" : ""}
                  </Text>
                </View>
              </View>
              <View style={profileStyles.gap} />
            </View>
          );
        })}

        {/* End - Each row infomation */}
      </TouchableOpacity>
    </View>
    // End - entire infobox
  );
};

export default InfoBoxTeacher;
