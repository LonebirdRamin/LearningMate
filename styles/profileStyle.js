import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const profileStyles = StyleSheet.create({
    scrollContainer:{
        paddingHorizontal: width*0.09
    },
    headerContainer:{
        flexDirection: 'row',
    },
    setting:{
        position: "absolute",
        bottom: 0,
        right: 0
    },
    picNameContainer:{
        paddingTop: height*0.06,
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

})

export default profileStyles;