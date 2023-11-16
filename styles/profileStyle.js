import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const profileStyles = StyleSheet.create({
    scrollContainer:{
        paddingHorizontal: width*0.09,
        marginBottom: height*0.1
    },
    headerContainer:{
        flexDirection: 'row',
    },
    
    picNameContainer:{
        paddingTop: height*0.02,
        paddingBottom: height*0.04,

        alignItems: 'center',
        justifyContent: 'center',
        rowGap: width*0.04
    },
    nameEmail:{
        alignItems: 'center'
    }, 
    text:(color, size, weight)=>{
        return {
            color: color,
            fontSize: size,
            fontWeight: weight
        }
    },
    infoContainer:
    {
        backgroundColor: 'rgba(78,78,97,0.2)',
        marginVertical: height*0.015,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#494949',
        borderRadius: 16,
        paddingTop: width*0.03,
        paddingBottom: width*0.03,
        padding: width*0.045,
    },
    infoRow:{
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: width*0.03,
    },
    iconSize:
    {
        width: width*0.055,
        height: width*0.055,
    },
    textContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    gap:{
        height: height*0.01
    },
    back:{
        width: width*0.05,
        height: width*0.05

    },
    line:{
        backgroundColor: "#454545",
        height: 1
    },
    lineGap:{
        height: height*0.015
    },
    gradeActHeader:{
        backgroundColor: 'rgba(78,78,97,0.5)',
        borderRadius: 10,
        borderColor: '#b6b6b65f',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
    }
})

export default profileStyles;