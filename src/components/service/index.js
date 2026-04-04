import { StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:color.gray4,
        padding: 12
    },
    infor1: {
        width: '70%',
        height: 60,
        gap: 2,
        padding: 10,
    },
    text1: {
        fontSize: 25,
        color: color.gray3
    },
    text2: {
        fontSize: 20,
        color: color.blue
    },
    divbutton: {
        width: '30%',
        height: '100%',
    },
    button:{
        width:'100%',
        height:'100%'
    }
})