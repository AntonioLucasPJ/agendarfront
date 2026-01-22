import { FlatList, View } from "react-native";
import icon from '../../constants/icon.js'
import { styles } from "./index.js";
import { appointments } from "../../constants/data.js";
import { Mecanico } from "../../components/mecanico/index.jsx";
import { Agendamento } from "../../components/appointement/index.jsx";
export function Calendary() {
    return (
        <View style={styles.container}>
            <FlatList
            data={appointments}
            keyExtractor={(appoint)=> appoint.id_appointement}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return <Agendamento 
                servico={item.service}
                mecanico={item.mecanico}
                especialidade={item.specialty}
                imgcalendar={icon.calendar}
                textdata={item.broking_date}
                imgwatch={icon.relogio}
                texthour={item.booking_hour}
                ></Agendamento>
            }}
            ></FlatList>
        </View>  
    )
}