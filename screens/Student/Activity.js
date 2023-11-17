import { View, Text, Dimensions } from "react-native";
import React, { useContext } from "react";
import DataContext from "../../routes/DataContext";
import globleStyles from "../../styles/globleStyles";
import profileStyles from "../../styles/profileStyle";
import ActivityList from "../../components/Profile/ActivityList";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const data = [
    {
        act: "PRE-FRESHY",
        hrs: 30
    },
    {
        act: "CPE GAMES",
        hrs: 10
    },
    {
        act: "ENGINEERING GAMES",
        hrs: 12
    },
    {
        act: "RUN FOR DAD",
        hrs: 12
    },
]

const Activity = () => {
  const email = useContext(DataContext);
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <View style={[profileStyles.scrollContainer]}>
        <ActivityList data={data}/>
      </View>
    </View>
  );
};

export default Activity;
