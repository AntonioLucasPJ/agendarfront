import { useContext, useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { SingupContext } from "../../contexts/user";
import { styles } from './index.js'
import { StatusBar } from "expo-status-bar";

export const ModalCustom = () => {
    const { activenotification, setactivenotification, msgnotification, statusapi} = useContext(SingupContext)
    const getIcon = () => {
        console.log(statusapi)
        if (statusapi === 200) {
            return (
                <View style={styles.iconCircleSucess}>
                    <Text style={styles.iconTextSucess}>✓</Text>
                </View>
            )
        }
        if(statusapi === 302){
            return (
                <View style={styles.iconCircleAlert}>
                    <Text style={styles.iconTextAlert}>!</Text>
                </View>
            )
        }
         else {
            return (
                <View style={styles.iconCircleSucess}>
                    <Text style={styles.iconTextSucess}>X</Text>
                </View>
            )
        }
    }
    useEffect(() => {
        if (activenotification) {
            console.log("O modal acabou de abrir com a messagem:", msgnotification)
        }
    }, [activenotification, msgnotification])
    return (
        <Modal
            animationType={'slide'}
            visible={activenotification}
            onRequestClose={() => setactivenotification(false)}
        >
            <View
                style={styles.centeredView}
            >
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)"></StatusBar>
                <View style={styles.modalView}>
                    <View style={styles.headerContainer}>
                        {getIcon()}
                        <Text style={styles.modalTextTitle}>Alert</Text>
                    </View>
                    <Text style={styles.modalTextMessage}>{msgnotification}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonclose]}
                        onPress={() => setactivenotification(false)}
                    >
                        <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}