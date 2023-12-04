import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("screen").width;
/*
  A style for dropdown in the Profile details.
*/
const dropDownGradeStyles = StyleSheet.create({
  container: {
    width: width * 0.2,
  },
  dropdown: {
    borderColor: "#3a3a48",
    borderWidth: 0.5,
    paddingHorizontal: width * 0.01,
  },
  listContainer: {
    backgroundColor: "#3a3a48",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    borderWidth: 1,
    borderColor: "#91919167",
    borderTopWidth: 0,
  },
});

export default dropDownGradeStyles;
