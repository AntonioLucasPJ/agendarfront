import { Text, View } from "react-native"
import { Button } from '../button/button.jsx'
import {styles} from './index.js'
export function MeetService(props) {
    return (
        <View style={styles.container}>
            <View style={styles.infor1}>
                <Text style={styles.text1}>{props.service}</Text>
                <Text style={styles.text2}>
                    { 
                        new Intl.NumberFormat('pt-BR',{
                            style:"currency",
                            currency:"BRL"
                        }).format(props.price)
                    }
                </Text>
            </View>
            <View style={styles.divbutton}>
                <Button style={styles.button} text='Agendar'></Button>
            </View>

        </View>

    )
}