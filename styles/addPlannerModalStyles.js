import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const addPlannerModalStyles = StyleSheet.create({
  modalView: {
    
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
    height: height*0.55,
    width: "80%",
    backgroundColor: "#353542",
    borderRadius: 30,
    paddingVertical: height * 0.025,
  },
  headerText: {
    color: "white",
    fontWeight: "500",
    fontSize: height * 0.02,
  },
  subHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    paddingBottom: height*0.01
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
    rowGap: width*0.02,
  },
  typeContainer:{
    width: "100%",
    
  },

  // Start - for PlannerType component
  typeBox:(selectedType, key)=>({
    width: width*0.15,
    justifyContent: 'center',
    height: height*0.035,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: selectedType===key? "rgba(124, 124, 155, 0)":'rgb(124, 124, 155)',
    borderWidth: 1,
    backgroundColor: selectedType===key? "#F04E22": "rgba(124, 124, 155, 0)"

  }),
  typeText:(selectedType, key)=>({
    
    color: selectedType===key? "white":"rgb(124, 124, 155)",
    
  }),
  // End - for PlannerType component


  // Start - Planner textinput
  textBox: {
    fontSize: 15,
    color: 'white',
    borderRadius: 15,
    height: height*0.04,
    borderWidth: 1,
    borderColor: "rgb(124, 124, 155)",
    paddingHorizontal: width*0.03
  },
  // End - Planner textinput

  // Start - Planner datetime
  dateTimeContainer:{
    paddingTop: height*0.01,
    columnGap: width*0.02,
    flexDirection: "row",

  },
  date: {
    flexDirection: "row",
    columnGap: width*0.02,
    alignSelf: 'flex-start'
  },
  icon: {
    width: width*0.05,
    height: width*0.05,
  },
  dateTimeText:{
    color: "#C1C1CD"
  },
  // End - Planner datetime


  // Start - Confirm button
  buttonContainer:{
    width: "100%",
    paddingVertical: height*0.01
  },
  button:{

  }
  
});

export default addPlannerModalStyles;
