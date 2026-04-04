import { FlatList, Image, Text, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { mecanicos } from "../../constants/data.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
export function TelaHome() {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Agende seu servico</Text>
            <FlatList
            data={mecanicos}
            keyExtractor={(doc)=> doc.id_mecanico}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return <Mecanico 
                name={item.name}
                icon={item.icon =='M'? icon.medico:icon.medica}
                especialidade={item.specialty}
                ></Mecanico>
            }}
            ></FlatList>
        </View>  
    )
}