import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineTeacher from "../../components/Profile/InfoBoxLineTeacher";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

/*
  A screen used to show the detail information of teacher.
*/
const PersonalInfoTeacher = ({ route }) => {
  const data = route.params; // get the passing parameter from route
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
