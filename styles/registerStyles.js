import { StyleSheet, Dimensions } from "react-native";

const registerStyles = StyleSheet.create({
  formContainer: {
    top: -Dimensions.get("screen").height / 20,
    flex: 1.7,
    paddingHorizontal: 20,
  },
  upperForm: {
    rowGap: 15,
    paddingBottom: 15,
  },
  lowerForm: {
    flex: 1,
    justifyContent: "space-between",
  },
  haveAccount: {
    rowGap: Dimensions.get("screen").height * 0.01,
  },
});

export default registerStyles;
