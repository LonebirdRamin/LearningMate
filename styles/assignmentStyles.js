import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width


const assignmentStyles = StyleSheet.create({
    container: 
    {
        height: "35%",
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
        paddingTop: Dimensions.get("screen").height*0.01,
        
        // minHeight: height*0.05,
        
        width: "100%"
    },
    box: {
        backgroundColor: 'rgba(78,78,97,0.2)',
        height: height*0.13,
        paddingVertical: 15,
        paddingHorizontal: 17,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgba(207,207,252, 0.2)',
        marginBottom: height*0.02
        
    },
    upperPart:{
        flexDirection: 'row',
    },
    iconContainer:(color)=>{
        return {
            backgroundColor: color,
            width: Dimensions.get("screen").width*0.1,
            height: Dimensions.get("screen").width*0.1,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap:- Dimensions.get("screen").width*0.007,
            minHeight: 45,
            minWidth: 45
        }
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
        // backgroundColor: "white",
        flex: 1,
        justifyContent: 'flex-end'
    },
    dueDateWrapper:
    {
        // backgroundColor: "green",
        paddingHorizontal: width*0.03,
        borderColor: "#353542",
        borderWidth: 1,
        borderRadius: 16,
        height:  Dimensions.get("screen").width*0.07,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        
    }
});

export default assignmentStyles;