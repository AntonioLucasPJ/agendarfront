import { useEffect, useRef } from "react"
import { Modal,Animated, Easing, View, Text } from "react-native"
import {styles} from './index.js'
import { Ionicons } from '@expo/vector-icons';
export default function Loading  ({visible}){
    const rotateAnim = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        if(visible){
            Animated.loop(
                Animated.timing(rotateAnim,{
                    toValue:1,
                    duration:1500,
                    easing:Easing.linear,
                    useNativeDriver:true
                })
            ).start()
        }else{
            rotateAnim.setValue(0)
        }
    },[visible,rotateAnim])
    const rotation = rotateAnim.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','360deg']
    })
    return(
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Animated.View
                    style={{transform:[{rotate:rotation}]}}
                    >
                        <Ionicons
                        name='settings-sharp'
                        size={60}
                        color='#005bb5'
                        ></Ionicons>
                    </Animated.View>
                    <Text style={styles.text}>Processando Cadastro....</Text>
                </View>
            </View>
        </Modal>
    )
}