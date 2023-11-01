import { StyleSheet, Dimensions } from "react-native";

const landingStyle = StyleSheet.create({
  pageLogo: {
    flex: 3,
    justifyContent: 'center'
  },
  buttonContainer:{
    flex: 1,
    paddingHorizontal: Dimensions.get("window").width/20, 
    justifyContent: 'center',
    rowGap: 20
    
  }
});

export default landingStyle;