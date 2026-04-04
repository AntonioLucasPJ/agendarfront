import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { api } from "../service/api";


export const ContextDeleteAppointments = createContext();
export const ProviderDeleteAppointments = ({ children }) => {
    const [id_appointement, setidappointement] = useState('')
    const [alertmsg,setalertmsg] = useState(false)
    async function DeleteAppointments(id) {
        const token = localStorage.getItem("token")
        if (token) {
            const decode = jwtDecode(token)
            try {
                const response = await api.delete(`/appointments/delete/${id}`)
                setalertmsg(true)
                return response.data
            }catch(error){
                return error
            }
        }
    }
    return (
        <ContextDeleteAppointments.Provider value={{ 
            setidappointement,
            setalertmsg,
            alertmsg,
            DeleteAppointments }}>{children}</ContextDeleteAppointments.Provider>
    )
}