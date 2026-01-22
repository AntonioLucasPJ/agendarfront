import { Image, Text, View, TextInput, Touchable, TouchableOpacity } from "react-native";
import icon from '../../constants/icon.js'
import { Button } from "../../components/button/button.jsx";
import { styles } from './index.js'
export function Cadastro() {
    return (
        <View style={styles.container}>
            <View style={styles.containerlogo}>
                <Image source={icon.logo} style={styles.logo}></Image>
            </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Nome..."></TextInput>
                <TextInput style={styles.input} placeholder="Email..."></TextInput>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha..."></TextInput>
            </View>
            <View>
                <Button text='Criar Conta'></Button>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textfoot}>Ja possui uma conta?</Text>
                <TouchableOpacity><Text style={styles.textlink}>Clique aqui</Text></TouchableOpacity>
            </View>
        </View>
    )
}