import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import { api } from "../service/api";

export const NewAppointments = createContext();
export const NewAppProvider = ({ children }) => {
    const [clienteselecionado, setclienteselecionado] = useState()
    const [mecanicoselecionado, setmecanicoselecionado] = useState()
    const [id_service, setidservice] = useState('')
    const [clientsapi, setclientsapi] = useState([])
    const [idclientapi, setidclientapi] = useState(null)
    const [mecanicosapi, setmecanicosapi] = useState([])
    const [serviceapi, setserviceapi] = useState([])
    const [servicoselecionado, setservicoselecionado] = useState('')
    const [selectdata, setselectdata] = useState('')
    const [horariosdisponiveis, sethorariosdisponiveis] = useState([])
    const [booking_hour, setbookhours] = useState('')
    const [notification, setnotification] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    async function CreateAppointment() {
        const token = localStorage.getItem('token')
        const id_user = clienteselecionado.id_user;
        const id_mecanico = mecanicoselecionado.id_mecanico
        if (token) {
            const decode = jwtDecode(token)
            const booking_date = selectdata.toISOString().split('T')[0]
            const dadosapi = {
                id_mecanico:id_mecanico,
                services:servicoselecionado,
                id_user:id_user,
                booking_date:booking_date,
                booking_hour:booking_hour
            }
            console.log(dadosapi)
            try {
                const res = await api.post('/appointements',dadosapi)
                setnotification(res.data.message)
                setTimeout(() => {
                    setactivenotification(true)
                }, 2000)
            } catch (error) {
                console.log(error)
                setnotification('Erro de Conexao')
                setTimeout(() => {
                    setactivenotification(true)
                }, 2000)

            }
        }
    }
    async function EditAppointment(id_appointement) {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            const id_user = decode.sub || decode.id// o id do usuario pode estar em uma dessas duas opções
            const booking_date = new Date(selectdata).toISOString().split('T')[0]
            console.log(`
            Usuario:${id_user}
            Mecanico:${id_mecanico}
            Servico:${services}
            data:${booking_date}
            hora:${booking_hour}
            `)
            try {
                const res = await api.put(`/appointments/edit/${id_appointement}`, {
                    id_mecanico,
                    services,
                    booking_date,
                    booking_hour
                })
                setnotification(res.data.message)
                setactivenotification(true)
            } catch (error) {
                console.log(error)
            } finally {
                window.location.reload()
            }
        }
    }
    async function Checkhorario() {
        const id_mecanico = mecanicoselecionado.id_mecanico

        const booking_date = new Date(selectdata).toISOString().split('T')[0]

        const horarios_totais = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
        const res = await api.post('/appointements/check', {
            id_mecanico,
            booking_date,
        })
        const horarios_ocupados = res.data.map(item => {
            return (item.booking_hour)
        })
        const disponiveis = horarios_totais.filter(h => !horarios_ocupados.includes(h));
        sethorariosdisponiveis(disponiveis)
        setbookhours(disponiveis[0] ? disponiveis[0] : 'Sem horarios disponiveis')
    }
    return (
        <NewAppointments value={{ clienteselecionado, setclienteselecionado, mecanicoselecionado, setmecanicoselecionado, id_service, setidservice, servicoselecionado, setservicoselecionado, clientsapi, setclientsapi, mecanicosapi, setmecanicosapi, serviceapi, setserviceapi, selectdata, setselectdata, booking_hour, setbookhours, notification, activenotification, setactivenotification, sethorariosdisponiveis, horariosdisponiveis, CreateAppointment, EditAppointment, Checkhorario }}>{children}</NewAppointments>
    )
} 