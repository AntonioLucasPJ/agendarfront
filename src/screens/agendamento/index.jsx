import { Text, View } from "react-native";
import { styles } from './index.js'
import { Button } from "../../components/button/button.jsx";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar.js";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = 'pt-br'
export function Schedule() {
    const [selectedDate, setselectedDate] = useState('')
    const [selectedhorario, setselectedhorario] = useState('10:00')
    //Calendario 
    //https://github.com/wix/react-native-calendars.git
    return (
        <View style={styles.container}>
            <View>
                <Calendar theme={styles.theme}
                    onDayPress={(day) => {
                        setselectedDate(day.dateString)
                    }}
                    markedDates={{
                        [selectedDate]: { selected: true }
                    }}
                    minDate={new Date().toDateString()}
                ></Calendar>
                <View>
                    <Text style={styles.texth}>Horário</Text>
                </View>
                <View>
                    <Picker selectedValue={selectedhorario}
                        onValueChange={(itemvalue, itemindex) => {
                            setselectedhorario(itemvalue)
                        }}
                    >
                        <Picker.Item
                            label="09:00" value='09:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="10:00" value='10:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="14:00" value='14:00'
                        ></Picker.Item>
                        <Picker.Item
                            label="15:00" value='15:00'
                        ></Picker.Item>

                    </Picker>
                </View>
            </View>
            <View>
                <Button text='Confirmar reserva'></Button>
            </View>
        </View>
    )
}