import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const addButtonStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.065,
  },

  plusBox: {
    elevation: 1,
    zIndex: 1,
    borderRadius: 16,
    borderTopWidth: 0.4,
    borderLeftWidth: 0.5,
    borderColor: "#5c5c5cbb",
    backgroundColor: "#292938",
  },
  plusSize: {
    height: width * 0.14,
    width: width * 0.14,
  },
  line: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: 1.85,
    backgroundColor: "#4E4E61",
  },
});

export default addButtonStyles;
