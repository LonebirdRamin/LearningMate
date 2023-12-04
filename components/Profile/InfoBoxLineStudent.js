import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";
import profileStyles from "../../styles/profileStyle";
import uuid from "react-native-uuid";
const width = Dimensions.get("screen").width;
/*
  This component is used to dynamically display the data into column group for student profile screen
  with the horizontal line seperation. 
*/
const InfoBoxLineStudent = ({ header, data, handlePress }) => {
  let i = 0;
  const subHeader =
    header === "Info"
      ? [
          "Student ID",
          "Name",
          "Gender",
          "Academic year",
          "Room",
          "Faculty",
          "Department",
          "Degree",
          "Date of Birth",
          "Advisor",
          "ID. card number",
          "Student email",
          "Email address",
        ]
      : [];
  return (
    // Start - entire infobox
    <View>
      {/*Start - Header of infobox */}
      <Text style={customStyles.h2}>{header}</Text>
      {/*Start - Header of infobox */}

      <View style={profileStyles.infoContainer} onPress={() => handlePress()}>
        {/* Start - Each row infomation */}
        {data.map((item) => {
          return (
            <View key={uuid.v4()}>
              <View style={profileStyles.lineGap} />

              <View style={profileStyles.infoRow}>
                {/*Start - text container */}
                <View style={profileStyles.textContainer}>
                  <Text style={customStyles.h2}>{subHeader[i++]}</Text>
                  <Text
                    style={profileStyles.text("#A2A2B5", width * 0.027, "500")}
                  >
                    {item}
                    {header === "Activity" ? " hrs" : ""}
                  </Text>
                </View>
              </View>
              <View style={profileStyles.lineGap} />
              {i === data.length ? <></> : <View style={profileStyles.line} />}
            </View>
          );
        })}

        {/* End - Each row infomation */}
      </View>
    </View>
    // End - entire infobox
  );
};

export default InfoBoxLineStudent;
