import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import globleStyles from "../../styles/globleStyles";
import InfoBox from "../../components/Profile/InfoBox";
import profileStyles from "../../styles/profileStyle";
import InfoBoxLineStudent from "../../components/Profile/InfoBoxLineStudent";
import DataContext from "../../routes/DataContext";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const PersonalInfoStudent = ({ route }) => {
  
  const data = route.params;

  

  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <ScrollView style={profileStyles.scrollContainer}>
        <InfoBoxLineStudent
          header={"Info"}
          data={data}
          handlePress={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default PersonalInfoStudent;
