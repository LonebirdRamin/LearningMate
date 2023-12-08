import { View, Text, Dimensions } from "react-native";
import React, { useContext } from "react";
import DataContext from "../../routes/DataContext";
import globleStyles from "../../styles/globleStyles";
import profileStyles from "../../styles/profileStyle";
import ActivityList from "../../components/Profile/ActivityList";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
/*
  This is a screen used to show the activity detail.
*/
const Activity = ({ route }) => {
  const email = useContext(DataContext);
  const data = route.params;
  const activityLabel = [{ label: "All", value: "0" }];
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <View style={[profileStyles.scrollContainer]}>
        <ActivityList data={data} label={activityLabel} />
      </View>
    </View>
  );
};

export default Activity;
