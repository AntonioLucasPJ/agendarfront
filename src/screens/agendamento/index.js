import { StyleSheet } from "react-native";
import { color, font_Size } from '../../constants/theme.js'
export const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        padding: 40,
        flex: 1,
        justifyContent:'space-between',
        marginBottom:20,
    },
    theme: {
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: color.blue,
        selectedDayTextColor: '#ffffff',
        todayTextColor: color.red,
        dayTextColor: '#2d4150',
        textDisabledColor: '#bcbcbc'
    },
    texth:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:20
    }
})