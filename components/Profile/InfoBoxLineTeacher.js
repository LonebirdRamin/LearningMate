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

const InfoBoxLineTeacher = ({ header, data, handlePress }) => {
  let i = 0;
  const subHeader =
    header === "Info"
      ? [
          "Teacher ID",
          "Name",
          "Gender",
          "Faculty",
          "Department",

          "Date of Birth",
          "ID. card number",
          "Teacher email",
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
                <View
                  style={[profileStyles.textContainer, { overflow: "hidden" }]}
                >
                  <Text style={customStyles.h2}>{subHeader[i++]}</Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      profileStyles.text("#A2A2B5", width * 0.027, "500"),
                    ]}
                  >
                    {item === null ? "-" : item}
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

export default InfoBoxLineTeacher;
