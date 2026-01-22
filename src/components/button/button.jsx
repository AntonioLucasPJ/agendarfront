import { StyleSheet, Text, TouchableOpacity } from "react-native";
import  {styles}  from "./button.js";
export function Button(props) {
    function enviarmsg(){
        alert('A mensagem foi enviada')
    }
    return (
        <TouchableOpacity 
        style={props.corbotao =='red'?styles.colored:styles.button} onPress={()=> enviarmsg()}
        > 
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}



