import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
/*
  A style for Planner box component.
*/
const plannerBoxStyles = StyleSheet.create({
  plannerBox: {
    justifyContent: "center",
    backgroundColor: "rgba(78,78,97,0.2)",
    width: "100%",
    height: height * 0.09,
    borderColor: "#5c5c5cbb",
    borderRadius: 16,
    borderTopWidth: 0.4,
    borderLeftWidth: 0.5,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
  },
  icon: {
    width: width * 0.09,
    height: width * 0.09,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: width * 0.06,
  },
  title: (isTime) => ({
    color: "white",
    fontWeight: "600",
    fontSize: height * 0.018,
    width: isTime ? 0 : width * 0.45,
  }),
  subtitle: {
    color: "#A2A2B5",
    fontWeight: "500",
    fontSize: height * 0.015,
    width: width * 0.45,
  },
  plannerDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default plannerBoxStyles;
