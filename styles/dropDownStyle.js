import { StyleSheet } from "react-native";

const dropDownStyles = StyleSheet.create({
  boxStyles: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#494955",
    width: "60%",
    marginHorizontal: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  inputStyle: {
    color: "white",
    width: "50",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 40,
  },
  dropdownItemStyles: {
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownTextStyles: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default dropDownStyles;
