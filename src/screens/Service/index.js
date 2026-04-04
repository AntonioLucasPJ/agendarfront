import { StyleSheet } from "react-native";
import { color } from "../../constants/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    banner:{
        width:'100%',
        height:400,
        backgroundColor:'#19399a',
        justifyContent:"center",
        alignItems:"center"
    },
    img1:{
        width:150,
        height:150,

    },
    textt1:{
        fontSize:30,
        color:'#fff',
        fontWeight:"bold"
    },
    textt2:{
        fontSize:20,
        color:color.gray3
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