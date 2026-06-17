import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./index.js";

const [acceppted, setAccepted] = useState(false)
export const Agreecheck = () => {
    return (
        <View style={styles.containerTerms}>
            <TouchableOpacity
                style={styles.checkboxWrapper}
                onPress={() => setAccepted(!acceppted)}
            >
                <View
                    style={[styles.checkbox, acceppted && styles.checkboxChecked]}
                >
                    {acceppted && <Text style={styles.checkmark}>V</Text>}
                </View>
                <Text style={styles.textTerms}>
                    Aceito os <Text style={styles.LinkTerms}>Termo de Uso</Text>
                    <Text style={styles.LinkTerms}>Politica de Privacidade</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}
