import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: `rgba(0,0,0,0.5s)`
    },
    modalView: {
        margin: 20,
        backgroundColor: `white`,
        borderRadius: 20,
        padding: 35,
        alignItems: `center`,
        shadowColor: `#000`,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    iconCircleSucess: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItens: 'center',
        marginRight: 10,
    },
    iconCircleAlert: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#c3ff00',
        justifyContent: 'center',
        alignItens: 'center',
        marginRight: 10,
    },
    iconTextAlert: {
        color: 'black',
        fontSize: 22,
        textAlign: "center",
        fontWeight: 'bold'
    },
    iconTextSucess: {
        color: 'white',
        fontSize: 18,
        textAlign: "center",
        fontWeight: 'bold'
    },
    button: {
        borderRadius: 10,
        padding:15,
        elevation: 2,
        marginTop: 15,
        width: "100%",
        alignItems: 'center'
    },
    buttonopen: {
        backgroundColor: "#F194FF"
    },
    buttonclose: {
        backgroundColor: "#3498db"
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:20,
    },
    modalTextTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalTextMessage: {
        fontSize: 20,
        textAlign: "center",
        fontWeight:"bold",
        color: "#333",
        marginVertical: 15
    }
})