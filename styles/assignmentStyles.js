import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width


const assignmentStyles = StyleSheet.create({
    container: 
    {
        paddingTop: Dimensions.get("screen").height*0.04,
        paddingHorizontal: Dimensions.get("screen").width*0.05 
    },
    textContainer:{
        rowGap: Dimensions.get("screen").height*0.005
    }, 
    headWrapper:
    {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    headerText:
    {
        color: 'white',
        fontWeight: "bold",
        fontSize: Dimensions.get("screen").height*0.027
    },
    subText:{
        color: "#A2A2B5",
        textAlign: 'right'
    },
    list:{
        paddingTop: Dimensions.get("screen").height*0.01
    },
    box: {
        backgroundColor: 'rgba(78,78,97,0.2)',
        height: "50%",
        paddingVertical: 15,
        paddingHorizontal: 17,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgba(207,207,252, 0.2)',
        
        
    },
    upperPart:{
        flexDirection: 'row',
    },
    iconContainer:{
        backgroundColor: 'green',
        width: Dimensions.get("screen").width*0.1,
        height: Dimensions.get("screen").width*0.1,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap:- Dimensions.get("screen").width*0.007,
        minHeight: 45,
        minWidth: 45
    },
    detailContainer:{
        paddingHorizontal: width*0.04,
        justifyContent: 'center',
        flex: 1,
        height: Dimensions.get("screen").width*0.1,
        minHeight: 45
    },
    dueDateContainer:
    {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderColor: "#353542",
        

    }
});

export default assignmentStyles;