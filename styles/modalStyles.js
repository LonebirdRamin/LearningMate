import { StyleSheet } from "react-native";

const modalStyle = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#353542",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        height: ''

    },
    headText:{
        fontSize: 25,
        fontWeight: '700',
        color: 'white'
    },
    buttonContainer:
    {
        height: '30%',
        width: '100%',
        backgroundColor: 'white'
    }
})

export default modalStyle;