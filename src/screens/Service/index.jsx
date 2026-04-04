import { FlatList, Image, Text, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { mecanicos_services } from "../../constants/data.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
import { MeetService } from "../../components/service/index.jsx";
export function Service() {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image
                source={icon.medica}
                style={styles.img1}
                ></Image>
                <Text style={styles.textt1}>Maria</Text>
                <Text style={styles.textt2}>🧰 Mecanico(a)</Text>
            </View>
            <FlatList
            data={mecanicos_services}
            keyExtractor={(ser)=> ser.id_service}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return  <MeetService
                service={item.description}
                price={item.price}></MeetService>
            }}
            ></FlatList>
        </View>  
    )
}