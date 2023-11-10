import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;


const plannerStyles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  calendarContainer:
  {
    paddingVertical: height*0.03
  },
  plannerList:
  {
    flex: 1,
    paddingTop: height*0.03,
    paddingHorizontal: width*0.05
  },
  listBound:{
    height: height>850? height*0.5: height*0.45,
  }
  
});

export default plannerStyles;