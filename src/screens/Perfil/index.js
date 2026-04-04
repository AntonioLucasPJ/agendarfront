import { StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        flex: 1,
    },
    title:{
        fontSize:30,
        color:color.blue,
        textAlign:'center',
        marginTop:40
    },
    infor1:{
        gap:5,
        borderWidth:1,
        borderColor:color.gray4,
        padding:5,
        gap:10,
    },
    text1:{
        fontSize:22,
        color:color.gray3
    },
    text2:{
        fontSize:20,
        color:color.gray1,
        
    }
})