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
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [loading, setloading] = useState(true)
    const [pesquisa, setpesquisa] = useState('')
    const paginate = (Number) => setCurrentPage(Number)
    const [filtroStatus, setfriltroStatus] = useState('Todos')

    /// Change Page
    const [error, seterror] = useState(false)
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
    }, [token, authorizate, DeleteAppointments, CurrentPage])

    //Appointment Get All
    async function LoadDateapi(token) {
        try {
            api.defaults.headers.Authorization = `Bearer ${token}`
            const res = await api.get('/appointmentsall')
            setpost(res.data)
            const currentPost = res.data.slice(indexoffirtpost, indexoflastpost)
            setappointmentsbd(currentPost)
        } catch (error) {
            seterror(true)
        }

    }
    const clientsFiltrados =
        post.filter(ve => {
            const termo = pesquisa.toLowerCase()
            const bateTexto =
                (ve.client?.toLowerCase().includes(termo) || '')
                || (ve.mecanico?.toLowerCase().includes(termo) || '')
                || (String(ve.id_appointement)?.toLowerCase().includes(termo) || '')
            const bateStatus = filtroStatus === 'Todos' || ve.situacao === filtroStatus
            return bateTexto && bateStatus
        });
    let indexoflastpost = CurrentPage * postPerPage
    let indexoffirtpost = indexoflastpost - postPerPage
    const clientsExibidos = clientsFiltrados.slice(indexoffirtpost, indexoflastpost)
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
            <div>
                <div>
                    <h2 className="d-inline user-select-none">Agendamentos</h2>
                    <Link
                        className='btn btn-outline-primary ms-5 mb-2'
                        to="/appointments/add"
                    >Novo Agendamento</Link>
                </div>
                <div className="row g-3 mb-4 align-items-center">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Buscar por Nome, Servicos..."
                                value={pesquisa}
                                onChange={(e) => setpesquisa(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <select
                            className="form-select"
                            value={filtroStatus}
                            onChange={(e) => setfriltroStatus(e.target.value)}
                        >
                            <option value='Todos'>Status: Todos</option>
                            <option value='Pendente'>Pendente</option>
                        </select>
                    </div>
                    {pesquisa != '' && (
                        <div className="col-md-2 animacao-fade-ind">
                            <button
                                className="btn btn-link text-danger text-decoration-none p-0 fw-semibold d-flex align-items-center"
                                onClick={() => {
                                    setpesquisa('')
                                    setfriltroStatus('Todos')
                                }}
                            >
                                <i className="bi bi-x-circle-fill me-2"></i>
                                Limpar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {!loading && error && (
                <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
                    <span style={{ fontSize: '24px' }}>⚠️</span>
                    <h4 className="fw-bold text-dark mt-2" style={{ letterSpacing: "-0.5px" }}>Falha ao carregar dados</h4>
                    <div className="text-muted small mb-3">Não foi possivel conectar ao servidor</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-sm btn-outline-primary rounded-3"
                    >
                        Tente Novamente
                    </button>
                </div>
            )
            }
            {appointmentsbd.length > 0 && (
                <div>
                    <div className="user-select-none">
                        <table className="table table-hover user-select-none">
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Mecanico</th>
                                    <th scope="col">Serviço</th>
                                    <th scope="col">Data/Hora</th>
                                    <th scope="col" className="text-end">Status</th>
                                    <th scope="col" className={styles.colbuttons}></th>
                                </tr>
                            </thead>
                            {clientsExibidos.length > 0 ? (
                                <tbody>
                                    {clientsExibidos.map(item => {
                                        return (
                                            <Appointment
                                                key={item.id_appointment}
                                                id_appointement={item.id_appointment}
                                                client={item.client}
                                                service={item.service}
                                                mecanico={item.mecanico}
                                                booking_date={item.booking_date}
                                                booking_hour={item.booking_hour}
                                                status={item.status}
                                                clickedit={Editar}
                                                clickdelete={Delete}
                                            ></Appointment>
                                        )
                                    })}
                                </tbody>
                            ) : (
                                <tr>
                                    <td colSpan='6' className="text-center py-5 bg-light-subtle">
                                        <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                            <i className="bi bi=search-hear fs-1 mb-3 text-secondary"></i>
                                            <h5 className="fw-bold text-dark mb-1">Nenhum agendamento encontrado</h5>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </table>
                        <Pagination postPerPage={postPerPage} totalPost={clientsFiltrados.length} paginate={paginate}></Pagination>
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
            )}

        </div>
    )
}

export default Appointments