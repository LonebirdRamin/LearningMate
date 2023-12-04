import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const profileStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: width * 0.09,
    marginBottom: height * 0.1,
  },
  headerContainer: {
    flexDirection: "row",
  },

  picNameContainer: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,

    alignItems: "center",
    justifyContent: "center",
    rowGap: width * 0.04,
  },
  nameEmail: {
    alignItems: "center",
  },
  text: (color, size, weight) => {
    return {
      color: color,
      fontSize: size,
      fontWeight: weight,
    };
  },
  infoContainer: {
    backgroundColor: "rgba(78,78,97,0.2)",
    marginVertical: height * 0.015,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "#494949",
    borderRadius: 16,
    paddingTop: width * 0.03,
    paddingBottom: width * 0.03,
    padding: width * 0.045,
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: width * 0.03,
  },
  iconSize: {
    width: width * 0.055,
    height: width * 0.055,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  gap: {
    height: height * 0.01,
  },
  back: {
    width: width * 0.05,
    height: width * 0.05,
  },
  line: {
    backgroundColor: "#454545",
    height: 1,
  },
  lineGap: {
    height: height * 0.015,
  },

  gradeHeader: {
    backgroundColor: "#3a3a48",
    borderRadius: 10,
    borderColor: "#b6b6b65f",
    borderLeftWidth: 0.4,
    borderBottomWidth: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingRight: width * 0.02,
    paddingVertical: height * 0.01,
  },
  list: {
    zIndex: -1,
    elevation: -1,
    top: -height * 0.03,
    backgroundColor: "#262630",
    borderRadius: 10,
    borderColor: "#b6b6b65f",
    borderLeftWidth: 0.4,
    borderBottomWidth: 0.4,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.015,
  },

  mapBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: height * 0.01,
    alignItems: "center",
  },
  gradeCred: {
    alignItems: "flex-end",
  },
  wrapper: {
    paddingTop: height * 0.01,
  },
  semester: {
    flexDirection: "row",
    columnGap: width * 0.01,
    alignItems: "center",
  },
  calendar: {
    width: width * 0.035,
    height: width * 0.035,
  },
  listHeader: {
    paddingTop: height * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default profileStyles;
