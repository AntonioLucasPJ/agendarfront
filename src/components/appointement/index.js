import { StyleSheet } from "react-native";
import { color, font_Size } from "../../constants/theme";

export const styles = StyleSheet.create({
    appointemet: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 12,
        
        borderColor: color.gray4
    },
    name: {
        fontSize: font_Size.lg,
        color: color.gray1,
        marginBottom: 8,
    },
    especia: {
        fontSize: font_Size.lg,
        color: color.gray3,
        marginBottom: 8
    },
    container:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    cards: {
        gap: 10,
    },
    cardone: {
        gap: 15,
        flexDirection:'row',
        alignItems: "center"
    },
    cardtwo: {
        gap: 15,
        flexDirection:'row',
        alignItems: "center",
        
    },
    imgagendamento: {
        width: 25,
        height: 25
    },
    textd: {
        fontSize: 15,
       
    },
    btn_calcelar:{
        padding:20,
        backgroundColor:color.red,
        borderRadius:10,
        fontWeight:"bold"
    },
    btn_text:{
        color:"#fff",
        fontWeight:"bold"
    }
})