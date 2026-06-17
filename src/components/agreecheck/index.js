import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    containerTerms:{
        width:'100%',
        marginVertical:15,
        paddingHorizontal:5
    },
    checkboxWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    checkbox:{
        width:22,
        height:22,
        borderWidth:2,
        borderColor:'#0066FF',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        backgroundColor:'#FFF',

    },
    checkboxchecked:{
        backgroundColor:'#0066FF'
    },
    checkmark:{
        color:'#FFF',
        fontSize:14,
        fontWeight:'bold'
    },
    textTerms:{
        fontSize:13,
        color:'#666',
        flex:1
    },
    LinkTerms:{
        color:'#0066FF',
        fontWeight:'bold',
        textDecorationLine:'underline'
    }
})