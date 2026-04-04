import { StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'#ffffff'
    },
    containerimglogo:{
        width:'100%',
        height:120,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#000'
        
    },
    text1:{
        fontSize:20
    },
    imglogo:{
        width:200,
        height:'100%',
        
    },
    tp:{
        width:'100%',
        fontSize:25,
    },
    cardmecanico:{
        width:'100%',
        height:100,
        flexDirection:'row',
        marginTop:20,
        backgroundColor:color.white,
        borderCurve:color.red,
        gap:15,
    },
    imgcard:{
        width:100,
        height:'100%'
    },
    mecanicoinfor:{
        width:'100%',
        justifyContent:"center"
        
    },
    inforname:{
        fontSize:25
    },
    inforsubtitle:{
        fontSize:20,
        color:color.gray3
    },
    menu:{
        width:'100%',
        height:30,
        flexDirection:'row',
        justifyContent:"space-around"
    },
    imgmenu:{
        width:'8%',
        height:'100%'
    }
})