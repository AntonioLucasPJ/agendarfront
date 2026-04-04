import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserLogin";
import { api } from "../service/api";

export const ContextMecanicos = createContext()
export const MecanicosProvider = ({children})=>{
    const [mecanicos,setmecanicos] = useState([])
    const {token} = useContext(UserContext)
    const tokenreal = token || localStorage.getItem("token")
    async function SearchMecanicos(){
        const res = await api('/mecanicos')
        api.defaults.headers.Authorization =`Bearer ${tokenreal}`
        setmecanicos(res.data)
    }
    return (
        <ContextMecanicos.Provider value={{mecanicos,SearchMecanicos}}>{children}</ContextMecanicos.Provider>
    )
}