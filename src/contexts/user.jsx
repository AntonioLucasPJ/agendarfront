
import { createContext, useContext, useState } from "react";
import api from "../constants/api";
import { FaS } from "react-icons/fa6";
import { Flashlight } from "lucide-react-native";
export const SingupContext = createContext({})
export const SingupProvider = ({ children }) => {
    const [loading,setloading] = useState(false)
    const [user, setsinguser] = useState('')
    const [cpf, setcpf] = useState('')
    const [email, setsingemail] = useState('')
    const [telefone, settelefone] = useState('')
    const [password, setsingpassword] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const [statusapi,setstatusapi] = useState('')
    async function CreateNewUser() {
        const dadosparaapi = {
            name: user,
            cpf: cpf.replace(/\D/g, ''),
            email: email,
            telefone: telefone.replace(/\D/g, ''),
            password: password,
        }
        try {
            const response = await api.post('/users/singup', dadosparaapi)
            console.log('teste')
            if (response.data) {
                console.log('pass')
                setTimeout(() => {
                    setstatusapi(response.status)
                    setactivenotification(true)
                    setmsgnotification('Usuario cadastrado com sucesso!!!')
                }, 3000)
                const token = response.data.token;
                
                // props.navigation.navigate("login")
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response)
                setTimeout(() => {
                    setstatusapi(error.response.status)
                    setactivenotification(true)
                    setmsgnotification(error.response.data)
                })
                
            } else {
                Alert.alert('Error de conexão, tente novamente')
                console.log(error.response.data.error)
            }
        }finally{
            setloading(false)
        }

    }
    return (
        <SingupContext.Provider value={{loading,setloading, user, setsinguser, cpf, setcpf, email, setsingemail, telefone, settelefone, password, setsingpassword, activenotification, setactivenotification,statusapi, msgnotification, setmsgnotification, CreateNewUser }}>{children}</SingupContext.Provider>
    )
}