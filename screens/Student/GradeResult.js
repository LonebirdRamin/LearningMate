import { View, Text, Dimensions, ScrollView, FlatList } from "react-native";
import React from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineStudent from "../../components/Profile/InfoBoxLineStudent";
import GradeList from "../../components/Profile/GradeList";
import DropDown from "../../components/Profile/DropDown";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const GradeResult = ({ route }) => {
  const params = route.params;

  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <View style={[profileStyles.scrollContainer]}>
        <GradeList
          data={params[0]}
          gpax={params[2]}
          currentSem={params[1]}
          semYear={params[3]}
        />
      </View>
    </View>
  );
};

export default GradeResult;
