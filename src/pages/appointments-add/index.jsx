
import { Navbar } from "../components/navbar/index.jsx"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router"
import './appointmentsadd.module.css'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { api } from "../../service/api.js"
import { act, useContext, useEffect, useState } from "react"
import { ptBR, se } from "date-fns/locale"
import { NewAppointments } from "../../context/Newappointments.jsx"
import { Modal } from "../components/Modal/index.jsx"
import { LoadingScreen } from "../components/loading/index.jsx"
import { SearchBar } from "../components/Searchbar/index.jsx"
import { SearchResult } from "../components/SearchResult/index.jsx"
import { constructNow } from "date-fns"
registerLocale('pt-BR', ptBR)
export default function AppointmentAdd() {
    const navigate = useNavigate()
    const location = useLocation();
    const { name } = location.state || 'Não encontrado'
    const { id_appointement } = useParams()
    const [loading, setloading] = useState(false)
    const [results, setresults] = useState([])
    const [selecteduser, setselecteduser] = useState('')
    const { CreateAppointment, EditAppointment, Checkhorario,
        id_user, setid_user,
        id_mecanico, setidmecanico,
        id_service, setidservice,
        mecanicosapi, setmecanicosapi,
        clientsapi, setclientsapi,
        serviceapi, setserviceapi,
        selectdata, setselectdata,
        booking_hour, setbookhours,
        notification,
        activenotification, setactivenotification,
        sethorariosdisponiveis, horariosdisponiveis,
    } = useContext(NewAppointments)
    const [buttondisable, setbuttondisable] = useState(true)
    function LoadNewAppointments() {
        setloading(true)
        CreateAppointment()
        setTimeout(() => {
            setloading(false)
        }, 2000)
        setid_user("")
        setidservice("")
        setidmecanico("")
        sethorariosdisponiveis("")
        setselectdata("")
        setbookhours("")
    }
    function ReturnHome() {
        setactivenotification(false)
        navigate('/appointments', { replace: true })
    }
    function Edit() {
        EditAppointment(id_appointement)
    }
    const apenasdiasuteis = (date) => {
        if (!date) return true
        const dia = date.getDay();
        return dia != 0 && dia != 6 //dias diferentes de sabado e domingo
    }
    useEffect(() => {
        const carregartela = () => {
            setloading(true)
            setTimeout(() => {
                setloading(false)
            }, 1600)
            // setid_user("")
            // setidservice("")
            // setidmecanico("")
            // sethorariosdisponiveis("")
            // setselectdata("")
            // setbookhours("")
        }
        carregartela()
    }, [id_mecanico, id_service])
    useEffect(() => {
        if (activenotification == true) {
            const timer = setTimeout(() => {
                setactivenotification(false)
                navigate('/appointments')
            }, 5000)
            return () =>clearTimeout(timer)
        }
    }, [activenotification])
    useEffect(() => {
        const dadosapi = async () => {
            const res = await api.get('/users/profile')
            const res2 = await api.get('/mecanicos')
            setclientsapi(res.data)
            setmecanicosapi(res2.data)
        }
        dadosapi()
    })
    useEffect(() => {
        let ativo = true;
        const checkinavalied = async () => {
            if (id_mecanico && selectdata) {
                try {
                    if (ativo) {
                        await Checkhorario()

                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        checkinavalied()
        return () => { ativo = false }//Cleanup function
    }, [selectdata])
    useEffect(() => {
        if (id_mecanico.length == '') return
        const buscarservicos = async () => {
            try {
                const response = await api.get(`mecanicos/${id_mecanico}/services`)
                setidservice(response.data[0].id_service)
                return setserviceapi(response.data)

            } catch (error) {
                setserviceapi('')
                if (error.response) {
                    console.log(`Status ${error.response.status} - ${error.response.data.message}`)
                } else {
                    console.log(`Error desconhecido:${error}`)
                }
            }
        }
        buscarservicos()
    }, [id_mecanico])
    return (
        <>
            <div className="container-fluid mt-page">
                {loading && (
                    <LoadingScreen></LoadingScreen>
                )}
                <Navbar></Navbar>
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12">
                        <h2>{id_appointement > 0 ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
                    </div>
                    <div className="col-12 mt-2">
                        {
                            activenotification ?
                                <Modal
                                    titulo='Agendamento Realizado!!!'
                                    description={notification}
                                    onclick={(e) => setactivenotification(!activenotification)}
                                    returnhome={() => ReturnHome()}></Modal>
                                : ''
                        }
                        {
                            id_appointement > 0 ?
                                <div>
                                    <label htmlFor="client" className="form-label">Cliente</label>
                                    <div className="form-control mb-2">
                                        <option disabled={true} value='1'>{name}</option>
                                    </div>
                                </div>
                                :
                                <div>
                                    <label htmlFor="client" className="form-label">Cliente</label>
                                    <div className="form-control mb-2">
                                        <select
                                            className="form-select"
                                            name="client" id='client' onChange={(e) => { setid_user(e.target.value) }}>
                                            <option >Selecione Cliente</option>
                                            {clientsapi.map(c => {
                                                return <option key={c.id_user} value={c.id_user}>{c.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                        }
                        <label htmlFor="mecanico" className="form-label">Mecanico</label>
                        <div className="form-control mb-2">
                            <select className="form-select" name="Mecanico" id='mecanico' onChange={(e) => { setidmecanico(e.target.value) }}>
                                <option value=''>Selecione um profissional...</option>
                                {mecanicosapi.map(item => {
                                    return <option key={item.id_mecanico} value={item.id_mecanico}>{item.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="servicos" className="form-label">Servicos</label>
                        <div className="form-control mb-2">
                            {serviceapi.length == 0 ?
                                <option disabled={true}>Selecione primeiro o mecanico</option>
                                :
                                <select className="form-select" name="Mecanico" id='mecanico' onChange={(e) => setidservice(e.target.value)}>
                                    {serviceapi.map(item => {
                                        return (
                                            <option key={item.id_service} value={item.id_service}>{item.description}</option>
                                        )
                                    })}
                                </select>
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="bookingDate" className="form-label">Data</label>
                        <DatePicker
                            className="form-control w-40"
                            selected={selectdata}
                            disabled={serviceapi.length == 0 ? true : false}
                            locale='pt-BR'
                            onChange={(date) => setselectdata(date)}
                            filterDate={(apenasdiasuteis)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='dd/mm/yyyy'
                            showTimeSelect={false}
                        ></DatePicker>
                    </div>
                    <div className="col-6">
                        <label htmlFor="bookingHour" className="form-label">Hora</label>
                        {horariosdisponiveis.length == 0 ?
                            <option disabled={true}>Horarios</option>
                            :
                            <select className="form-select rounded px-3" disabled={selectdata.length === 0} required={true} value={booking_hour} onChange={(e) => setbookhours(e.target.value)}>
                                {horariosdisponiveis.map(item => {
                                    return (
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })}
                            </select>

                        }

                    </div>
                    <div className="col-12 mt-3">
                        <div className="d-flex justify-content-end">
                            <Link to='/appointments' className='btn btn-outline-primary me-3'>
                                Cancelar
                            </Link>
                            <button
                                className="btn btn-primary"
                                onClick={id_appointement > 0 ? Edit : LoadNewAppointments}
                                disabled={horariosdisponiveis.length == 0 ? true : false}
                            >{id_appointement > 0 ? 'Editar Dados' : 'Salvar Dados'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}