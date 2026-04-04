import { createContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { LoadingScreen } from "../pages/components/loading";
import { data } from "react-router";
import { da } from "date-fns/locale";

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
    const [userinfor, setuserinfor] = useState([])
    const [authorizate, setauthorizate] = useState(!!localStorage.getItem('token') || null)
    const [token, settoken] = useState(localStorage.getItem('token'))
    const [user, setuser] = useState('')
    const [showtext, setshowtext] = useState(false)
    const [message, setmessage] = useState('')
    const [name,setname] = useState('')
    const [email, setemail] = useState('')
    const [telefone,settelefone] = useState('')
    const [password, setpassword] = useState('')
    const [messageativa, setmessageativa] = useState(false)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            setauthorizate(true)
        }
        setloading(false)
    }, [])

    const HandleLogin = async () => {
        try {
            const response = await api.post('/admin/login', {
                email,
                password
            })
            if (response.status == 200) {
                const name = response.data.name
                const tokenrecebido = response.data.token
                localStorage.setItem('token', tokenrecebido)
                localStorage.setItem('name', JSON.stringify(name))
                setuserinfor(response.data)
                setuser(name)
                settoken(tokenrecebido)
                setauthorizate(true)
                api.defaults.headers.Authorization = `Bearer ${token}`
                return true
            }

        } catch (error) {
            const st = error.status
            setmessageativa(!messageativa)
            return setmessage(`${st} - ${error.response.data.message}`)
        }
    }
    const CreateSingup = async () => {
        try {
            const response = await api.post('/admin', {
                name,
                email,
                password,
                telefone,
            })
            if (response.status == 200) {
                const name = response.data.name
                const tokenrecebido = response.data.token
                localStorage.setItem('token', tokenrecebido)
                localStorage.setItem('name', JSON.stringify(name))
                setuserinfor(response.data)
                setuser(name)
                settoken(tokenrecebido)
                setauthorizate(true)
                api.defaults.headers.Authorization = `Bearer ${token}`
                return true
            }

        } catch (error) {
            const st = error.status
            setmessageativa(!messageativa)
            return setmessage(`${st} - ${error.response.data.message}`)
        }
    }
    if (loading) {
        return <LoadingScreen></LoadingScreen>
    }
    return (
        <UserContext.Provider value={{
            userinfor, 
            loading,
            authorizate,
            token,
            user,
            setauthorizate,
            messageativa, setmessageativa,
            message, showtext,
            setshowtext,
            email, 
            telefone,settelefone,
            password,
            name,setname,
            setemail, setpassword, HandleLogin,CreateSingup }}>{children}</UserContext.Provider>
    )
}
