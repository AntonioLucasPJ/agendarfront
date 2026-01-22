import { StyleSheet } from "react-native";
import {color,font_Size} from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container:{
        backgroundColor:color.white,
        padding:40,
        flex:1,
        justifyContent:'space-around'
    },
    containerlogo:{
        alignItems:"center",
    },
    logo: {
        width:'100%',
        height:'40%',
        backgroundColor:color.red,
        objectFit:"cover"
    },
    containerinput:{
        gap:15
    },
    input:{
        backgroundColor:color.gray5,
        padding:25,
        borderRadius:15,
        fontSize:22,
    },
    footer:{
        flexDirection:"row",
        justifyContent:'center',
        gap:5
    },
    textfoot:{
        fontSize:20,
    },
    textlink:{
        color:color.blue,
        fontSize:20
    }
})