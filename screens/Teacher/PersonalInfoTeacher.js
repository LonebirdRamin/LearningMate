import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineTeacher from "../../components/Profile/InfoBoxLineTeacher";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = {
  id: 64070503433,
  name: "Pannawat Durongrittichai",
  gender: "Male",
  faculty: "Engineering",
  dep: "Computer Engineering",
  deg: "Bachelor's Degree",
  birth: "19 Jun 2003",
  id: "1101501193641",
  stdEmail: "pannawat.duro@kmutt.ac.th",
  email: "takongbaza@gmail.com",
};
const prepData = Object.values(data);

const PersonalInfoTeacher = ({ route }) => {
  const data = route.params;
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <ScrollView style={profileStyles.scrollContainer}>
        <InfoBoxLineTeacher
          header={"Info"}
          data={data}
          handlePress={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default PersonalInfoTeacher;
