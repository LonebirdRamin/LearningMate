import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const formAssignmentStyles = StyleSheet.create({
  announceBox: {
    borderRadius: 30,
    width: windowWidth * 0.85,
    color: "white",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: windowHeight * 0.17,
    marginBottom: windowHeight * 0.025,
    paddingLeft: windowWidth * 0.05,
  },
  mainViewLearningZone: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: windowHeight * 0.02,
  },
  buttonMain: {
    alignItems: "center",
    height: "20%",
    marginTop: windowHeight * -0.012,
  },
  mainboxLearning: {
    marginTop: windowHeight * -0.014,
    justifyContent: "flex-start",
    width: "90%",
  },
  learningInput: {
    borderRadius: 30,
    width: windowWidth * 0.85,
    color: "white",
    borderWidth: 1,
    borderColor: "#C1C1CD",
    height: windowHeight * 0.07,
    marginBottom: windowHeight * 0.025,
    paddingLeft: windowWidth * 0.05,
  },
  checkBox: {
    marginTop: windowHeight * 0.017,
    width: "90%",
    marginLeft: windowWidth * -0.015,
  },
  textCheckBox: {
    color: "#C1C1CD",
    fontSize: 15,
    marginLeft: windowWidth * 0.005,
  },
  confirmButton: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.067,
    width: "55%",
    backgroundColor: true ? "#F04E22" : "#393A3F",
    marginTop: windowHeight * 0.027,
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
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default formAssignmentStyles;
