import { View, Text, Dimensions } from "react-native";
import React, { useContext } from "react";
import DataContext from "../../routes/DataContext";
import globleStyles from "../../styles/globleStyles";
import profileStyles from "../../styles/profileStyle";
import ActivityList from "../../components/Profile/ActivityList";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



const Activity = ({route}) => {
  const email = useContext(DataContext);
  const data = route.params;
  
  return (
    <View style={[globleStyles.pageContainer, { paddingTop: height * 0.03 }]}>
      <View style={[profileStyles.scrollContainer]}>
        <ActivityList data={data}/>
      </View>
    </View>
  );
};

export default Activity;
