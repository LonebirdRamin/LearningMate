import { Dimensions, StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    backgroundColor: "#353542",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 1,
    padding: 35,
    alignItems: "center",
  },
  headText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },
  buttonContainer: {
    height: "30%",
    width: "100%",
    backgroundColor: "white",
  },
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: "40%",
    backgroundColor: "#353542",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 50,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "white",
    borderRadius: 3,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});

export default modalStyles;
