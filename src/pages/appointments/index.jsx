import { Link, useNavigate } from "react-router"
import { Navbar } from "../components/navbar/index.jsx"
import { mecanicos } from "../../context/data.js"
import styles from './appointments.module.css'
import { Appointment } from "../components/appointment/index.jsx"

import { api } from "../../service/api.js"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserLogin.jsx"
import { ContextDeleteAppointments } from "../../context/Deleteappointments.jsx"
import { ModalDelete } from "../components/Modal/index.jsx"
import { da, de, id, se } from "date-fns/locale"
import { AlertMessage } from "../components/Alert/index.jsx"
import { Pagination } from "../components/Pagination/index.jsx"
import { NewAppointments } from "../../context/Newappointments.jsx"
function Appointments() {
    //Loading Limited Page
    const [post, setpost] = useState([])
    const [appointmentsbd, setappointmentsbd] = useState([])
    const [CurrentPage, setCurrentPage] = useState(2)
    const [postPerPage, setPostPerPage] = useState(8)
    const [loading, setloading] = useState(true)
    /// Change Page
    const paginate = (Number) => setCurrentPage(Number)

    const [mecanicosapi, setmecanicosapi] = useState([])
    const [id_mecanico, setidmecanico] = useState('')
    const [deleteauth, setdeleteauth] = useState(false)
    const [id_appointementdelete, setidappointmentdelete] = useState('')
    const [alertdelete, setalertdelete] = useState(false)
    const [booking_date_begin, setbooking_date_begin] = useState('')
    const [booking_date_end, setbooking_date_end] = useState('')
    const [filtermecanico, setfiltermecanico] = useState(0)
    const { token, authorizate, user } = useContext(UserContext)
    const [message, setmessage] = useState('')
    const { alertmsg, setalertmsg, DeleteAppointments } = useContext(ContextDeleteAppointments)
    const navigate = useNavigate()
    useEffect(() => {
        if (!loading && alertmsg) {
            const timer = setTimeout(() => {
                setalertmsg(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [alertmsg])
    useEffect(() => {
        const carregartela = async () => {
            setloading(true)
            const TokenReal = token || localStorage.getItem('token')
            Filtrar(TokenReal)
            if (!token && !authorizate) {
                return navigate("/")
            }
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                await LoadDateapi(TokenReal)
                api.defaults.authorization = `Bearer ${TokenReal}`
                const res = await api.get('/mecanicos')
                setmecanicosapi(res.data)
                setidmecanico(res.data.id_mecanico)

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        // const dadosapi = async () => {
        //     api.defaults.authorization = `Bearer ${token}`
        //     const res = await api.get('/mecanicos')
        //     setmecanicosapi(res.data)
        //     setidmecanico(res.data.id_mecanico)
        // }
        carregartela()
        // dadosapi()
    }, [token, authorizate, DeleteAppointments,CurrentPage])

    //Appointment Get All
    async function LoadDateapi(token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const res = await api.get('/appointmentsall')
        setpost(res.data)
        const indexoflastpost = CurrentPage * postPerPage
        const indexoffirtpost = indexoflastpost - postPerPage
        const currentPost = res.data.slice(indexoffirtpost, indexoflastpost)
        setappointmentsbd(currentPost)
    }
    function Editar(id_appointement, client) {
        navigate("/appointments/edit/" + id_appointement, {
            state: {
                name: client
            }
        })
    }
    async function Filtrar(tokenreal) {
        if (booking_date_end.length > 0) {
            api.defaults.authorization = `Bearer ${tokenreal}`
            const res = await api.post('/appointments/filter', {
                booking_date_begin,
                booking_date_end,
                filtermecanico
            })
            setloading(true)
            setappointmentsbd(res.data)
            setTimeout(() => {
                setloading(false)
            }, 2000)
        }
    }
    function Delete(id_appointement) {
        setidappointmentdelete(id_appointement)
        setalertdelete(true)
    }
    async function DeletarBD() {
        const response = await DeleteAppointments(id_appointementdelete)
        setmessage(response)
        setalertdelete(false)
    }
    return (
        <div className='container-fluid mt-page'>
            {loading && (
                <div className={styles.load_overlay}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadtext}>Carredando dados...</p>
                </div>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja deletar esse atendimento?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => DeletarBD()}
                ></ModalDelete>
            )}
            {alertmsg && (
                <AlertMessage msg={message}></AlertMessage>
            )}
            <Navbar></Navbar>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h2 className="d-inline user-select-none">Agendamentos</h2>
                    <Link
                        className='btn btn-outline-primary ms-5 mb-2'
                        to="/appointments/add"
                    >Novo Agendamento</Link>
                </div>
                <div className='d-flex justify-content-end align-items-center user-select-none'>
                    <input id='startDate'
                        onChange={(e) => setbooking_date_begin(e.target.value)}
                        className='form-control'
                        type="date"></input>
                    <span className="m-3">Até</span>
                    <input id='startDate'
                        onChange={(e) => setbooking_date_end(e.target.value)}
                        className='form-control'
                        type="date"></input>
                    <div className="form-control ms-3 me-3 h-50">
                        <select className="w-auto" name="Mecanico" id='mecanico' onChange={(e) => setfiltermecanico(e.target.value)}>
                            <option value="" className={styles.opvalues}>Todos os mecanicos</option>
                            {mecanicosapi.map(item => {
                                return <option key={item.id_mecanico} value={item.id_mecanico}>{item.name}</option>
                            })}
                        </select>   
                    </div>
                    <button className='btn btn-primary' disabled={booking_date_begin && booking_date_end?false:true} onClick={() => Filtrar()}>Filtrar</button>
                </div>
            </div>
            <div className="user-select-none">
                <table className="table table-hover user-select-none">
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">Mecanico</th>
                            <th scope="col">Serviço</th>
                            <th scope="col">Data/Hora</th>
                            <th scope="col" className="text-end">Valor</th>
                            <th scope="col" className={styles.colbuttons}></th>
                        </tr>
                    </thead>
                    {appointmentsbd && (
                        <tbody>
                            {appointmentsbd.map(item => {
                                return (
                                    <Appointment
                                        key={item.id_appointment}
                                        id_appointement={item.id_appointment}
                                        client={item.client}
                                        service={item.service}
                                        mecanico={item.mecanico}
                                        booking_date={item.booking_date}
                                        booking_hour={item.booking_hour}
                                        price={item.price}
                                        clickedit={Editar}
                                        clickdelete={Delete}
                                    ></Appointment>
                                )
                            })}
                        </tbody>
                    )}
                </table>
                <Pagination postPerPage={postPerPage} totalPost={post.length} paginate={paginate}></Pagination>
                {appointmentsbd == '' ?
                    <div className={styles.contentempty}>
                        <h1>Dados não carregados</h1>
                        <button
                            className={styles.rcgbutton}
                            onClick={(e) => console.log('')}>Atualizar Pagina</button>
                    </div>
                    : ''}
            </div>
        </div>
    )
}

export default Appointments