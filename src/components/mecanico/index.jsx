import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from './index.js'
export function Mecanico(props) {
<<<<<<< HEAD
=======

>>>>>>> e1b826c (update 3.6)
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={props.icon} style={styles.img}></Image>
            <View style={styles.infor1}>
                <Text style={styles.titlemecanico}>{props.name}</Text>
                <Text style={styles.subtitle}>{props.especialidade}</Text>
            </View>

        </TouchableOpacity>
    )
}