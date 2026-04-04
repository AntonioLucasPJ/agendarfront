import { Text, View } from 'react-native'
import { styles } from './index.js'
export function Perfil() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de perfil</Text>
            <View style={styles.infor1}>
                <Text style={styles.text1}>Nome:</Text>
                <Text style={styles.text2}>Mecanicos da firma</Text>
            </View>
            <View style={styles.infor1}>
                <Text style={styles.text1}>Email</Text>
                <Text style={styles.text2}>supersonic@gmail.com</Text>
            </View>
        </View>
    )
}