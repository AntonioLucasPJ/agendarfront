import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../button/button.jsx";

export function Agendamento(props) {
    return (
        <View style={styles.appointemet}>
            <Text style={styles.name}>{props.servico} - {props.mecanico}</Text>
            <Text style={styles.especia}>{props.especialidade}</Text>
            <View style={styles.container}>
                <View style={styles.cards}>
                    <View style={styles.cardone}>
                        <Image style={styles.imgagendamento} source={props.imgcalendar}></Image>
                        <Text style={styles.textd}>{props.textdata}</Text>
                    </View>
                    <View style={styles.cardtwo}>
                        <Image style={styles.imgagendamento} source={props.imgwatch}></Image>
                        <Text style={styles.textd}>{props.texthour}</Text>
                    </View>
                </View>
                <View style={styles.div}>
                    <Button corbotao='red' text='Cancelar Reseva'></Button>
                </View>
            </View>
        </View>
    )
}