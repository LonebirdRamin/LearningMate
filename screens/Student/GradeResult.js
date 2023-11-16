import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineStudent from "../../components/Profile/InfoBoxLineStudent";
import GradeAct from "../../components/Profile/GradeAct";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const GradeResult = () => {
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <ScrollView style={profileStyles.scrollContainer}>
        <GradeAct gpax={3.81}/>
      </ScrollView>
    </View>
  );
};

export default GradeResult;
