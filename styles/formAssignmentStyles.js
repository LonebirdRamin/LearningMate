import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const formAssignmentStyles = StyleSheet.create({
  confirmButton: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.067,
    width: "55%",
    backgroundColor: true ? "#F04E22" : "#393A3F",
    marginTop: windowHeight * 0.03,
  },
  input: {
    borderRadius: 30,
    color: "white",
    width: "90%",
    marginHorizontal: "15%",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: windowHeight * 0.063,
    marginBottom: windowHeight * 0.015,
    paddingLeft: windowWidth * 0.05,
  },
  inputFile: {
    marginTop: windowHeight * 0.017,
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  text: {
    color: "#C1C1CD",
    paddingBottom: windowHeight * 0.013,
    alignSelf: "stretch",
    marginHorizontal: "5%",
    fontSize: 15,
  },
  textFile: {
    color: "#C1C1CD",
    fontSize: 15,
  },
});

export default formAssignmentStyles;
