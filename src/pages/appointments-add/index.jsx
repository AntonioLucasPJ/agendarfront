
import { Navbar } from "../components/navbar/index.jsx"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router"
import './appointmentsadd.module.css'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { api } from "../../service/api.js"
import { act, use, useContext, useEffect, useState } from "react"
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
    const [buscar, setbuscar] = useState('');
    const [mostrar, setmostrar] = useState(false)
    const [buscarmecanico, setbuscarmecanico] = useState('')
    const [mostrarmecanico, setmostrarmecanico] = useState('')
    const [idUser, setIdUser] = useState(null)
    const [selecteduser, setselecteduser] = useState('')
    const { CreateAppointment,
        EditAppointment, Checkhorario,
        clienteselecionado, setclienteselecionado,
        mecanicoselecionado, setmecanicoselecionado,
        id_user, setid_user,
        id_mecanico, setidmecanico,
        id_service, setidservice,
        mecanicosapi, setmecanicosapi,
        clientsapi, setclientsapi,
        serviceapi, setserviceapi,
        servicoselecionado, setservicoselecionado,
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

    }
    function ReturnHome() {
        CleanScreen()
        setactivenotification(false)
        navigate('/appointments', { replace: true })
    }
    function Edit() {
        EditAppointment(id_appointement)
    }
    function CleanScreen() {
        window.location.reload()
    }
    const apenasdiasuteis = (date) => {
        if (!date) return true
        const dia = date.getDay();
        return dia != 0 && dia != 6 //dias diferentes de sabado e domingo
    }
    const handleCheckboxChange = (id) => {
        if (servicoselecionado.includes(id)) {
            setservicoselecionado(servicoselecionado.filter(item => item !== id))
        } else {
            setservicoselecionado([...servicoselecionado, id])
        }
    }
    useEffect(() => {
        const carregartela = () => {
            setloading(true)
            setTimeout(() => {
                setloading(false)
            }, 1600)
        }
        carregartela()
    }, [id_mecanico, id_service])
    useEffect(() => {
        if (activenotification == true) {
            const timer = setTimeout(() => {
                setactivenotification(false)
                navigate('/appointments')
            }, 5000)
            return () => clearTimeout(timer)
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
    const clientesFiltrados = clientsapi.filter(item =>
        item.name?.toLowerCase().includes(buscar.toLowerCase()) ||
        item.email?.toLowerCase().includes(buscar.toLocaleLowerCase())
    )
    const handleSelecionarClient = (client) => {
        setclienteselecionado(client)
        setbuscar('')
        setmostrar(false)
    }
    const handleRemoverSelecao = () => {
        setclienteselecionado(null)
    }
    const HandleInputChange = (e) => {
        const valordigitado = e.target.value;
        setbuscar(valordigitado);
        const clientencontrado = clientsapi.find(c => c.name === valordigitado);
        if (clientencontrado) {
            setIdUser(clientencontrado.id_user)
        } else {
            setid_user(null)
        }
    }
    const MecanicosFiltrados = mecanicosapi.filter(item =>
        item.name?.toLowerCase().includes(buscar.toLowerCase()) ||
        item.titulo_profissional?.toLowerCase().includes(buscar.toLocaleLowerCase())
    )

    const handleSelecionarMecanico = (client) => {
        setmecanicoselecionado(client)
        setbuscarmecanico('')
        setmostrarmecanico(false)
    }

    const handleRemoverSelecaoMecanico = () => {
        setmecanicoselecionado(null)
    }
    const HandleInputChangeMecanico = (e) => {
        const valordigitado = e.target.value;
        setbuscarmecanico(valordigitado);
        const mecanicoencontrado = clientsapi.find(c => c.name === valordigitado);
        if (mecanicoencontrado) {
            setidmecanico(mecanicoencontrado.id_mecanico)
        } else {
            setidmecanico(null)
        }
    }
    useEffect(() => {
        let ativo = true;
        const checkinavalied = async () => {
            if (selectdata) {
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
        if (clienteselecionado && mecanicoselecionado) {
            let user = clienteselecionado.id_user
            let mecanico = mecanicoselecionado.id_mecanico
            const buscarservicos = async (e) => {
                try {
                    const response = await api.get(`mecanicos/${mecanico}/services`)
                    setidservice(response.data[0].id_service)
                    return setserviceapi(response.data)

                } catch (error) {
                    setserviceapi([])
                    if (error.response) {
                        console.log(`Status ${error.response.status} - ${error.response.data.message}`)
                    } else {
                        console.log(`Error desconhecido:${error}`)
                    }
                }
            }
            buscarservicos()
        }

    }, [clienteselecionado, mecanicoselecionado])
    return (
        <>
            <Navbar></Navbar>
            <main className="container mt-5 pt-5 pb-5">
                {loading && (
                    <LoadingScreen></LoadingScreen>
                )}
                <div className="row justify-content-center">
                    <div className="col-10 col-md-10 col-lg-5 bg-white p-4 rounded-4 shadow-sm border">
                        <div className="text-center mb-3">
                            <h2 className="text-primary user-select-none fw-bold">
                                {id_appointement > 0 ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
                        </div>
                        <div>
                            {
                                activenotification ?
                                    <Modal
                                        titulo={notification}
                                        description={notification}
                                        onclick={() => CleanScreen()}
                                        returnhome={() => ReturnHome()}></Modal>
                                    : ''
                            }
                            {
                                id_appointement > 0 ?
                                    <div className="col-md-6">
                                        <label htmlFor="client" className="form-label">Cliente</label>
                                        <div className="form-control mb-2">
                                            <option disabled={true} value='1'>{name}</option>
                                        </div>
                                    </div>
                                    :
                                    <div className="mb-4 position-realtive w-100">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Cliente</label>
                                        {clienteselecionado ? (
                                            <div className="card-border-primary bg-light p-3 d-flex flex-row justify-content-between align-items-center shadow-sm animated fadeIn">
                                                <div>
                                                    <h6 className="mb-0 text-primary fw-bold">
                                                        👤 {clienteselecionado.name}
                                                    </h6>
                                                    <small className="text-muted">{clienteselecionado.email}</small>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={handleRemoverSelecao}
                                                >
                                                    Trocar Cliente
                                                </button>
                                            </div>

                                        ) : (
                                            <>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0">🔍</span>
                                                    <input
                                                        type="text"
                                                        className="form-control border-start-0"
                                                        placeholder="Digite o nome ou e-mail do cliente"
                                                        value={buscar}
                                                        onChange={(e) => {
                                                            setbuscar(e.target.value)
                                                            setmostrar(true)
                                                        }}
                                                        onFocus={() => setmostrar(true)}
                                                        autoComplete="off"
                                                    ></input>
                                                </div>
                                                {mostrar && buscar.length > 0 && (
                                                    <ul className="list-group position-absolute w-100 shadow-lg mt-1"
                                                        style={{
                                                            zIndex: 1000,
                                                            maxWidth: '450px',
                                                            overflowY: 'auto',

                                                        }}>
                                                        {clientesFiltrados.length > 0 ? (
                                                            clientesFiltrados.map(item => (
                                                                <li
                                                                    key={item.id_user}
                                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-3"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => handleSelecionarClient(item)}
                                                                >
                                                                    <div className="text-start">
                                                                        <strong className="d-block text-dark">{item.name}</strong>
                                                                        <small className="text-muted">{item.email}</small>
                                                                    </div>
                                                                    <button type="button" className="btn btn-primary btn-sm rounded-ill px-3">Selecionar</button>
                                                                </li>
                                                            ))


                                                        ) : (
                                                            <li className="list-group-item text-muted text-center py-3">
                                                                Nehum cliente encontrado com ""
                                                            </li>
                                                        )}
                                                    </ul>
                                                )}
                                            </>

                                        )
                                        }
                                    </div>}
                            <div className="mb-4 position-realtive w-100">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Mecanicos</label>
                                {mecanicoselecionado ? (
                                    <div className="card-border-primary bg-light p-3 d-flex flex-row justify-content-between align-items-center shadow-sm animated fadeIn">
                                        <div>
                                            <h6 className="mb-0 text-primary fw-bold">
                                                👤 {mecanicoselecionado.name}
                                            </h6>
                                            <small className="text-muted">{mecanicoselecionado.titulo_profissional}</small>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleRemoverSelecaoMecanico}
                                        >
                                            Trocar Mecanico
                                        </button>
                                    </div>

                                ) : (
                                    <>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0">🔍</span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0"
                                                placeholder="Digite o nome do Mecanico"
                                                value={buscarmecanico}
                                                onChange={(e) => {
                                                    setbuscarmecanico(e.target.value)
                                                    setmostrarmecanico(true)
                                                }}
                                                onFocus={() => setmostrarmecanico(true)}
                                                autoComplete="off"
                                            ></input>
                                        </div>
                                        {mostrarmecanico && buscarmecanico.length > 0 && (
                                            <ul className="list-group position-absolute w-100 shadow-lg mt-1"
                                                style={{
                                                    zIndex: 1000,
                                                    maxWidth: '450px',
                                                    overflowY: 'auto',

                                                }}>
                                                {MecanicosFiltrados.length > 0 ? (
                                                    MecanicosFiltrados.map(item => (
                                                        <li
                                                            key={item.id_mecanico}
                                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleSelecionarMecanico(item)}
                                                        >
                                                            <div className="text-start">
                                                                <strong className="d-block text-dark">{item.name}</strong>
                                                                <small className="text-muted">{item.titulo_profissional}</small>
                                                            </div>
                                                            <button type="button" className="btn btn-primary btn-sm rounded-ill px-3">Selecionar</button>
                                                        </li>
                                                    ))


                                                ) : (
                                                    <li className="list-group-item text-muted text-center py-3">
                                                        Nehum cliente encontrado com ""
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </>

                                )
                                }
                            </div>
                        </div>
                        <div className="animate__animated animate__fadeIn">
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Servicos</label>
                                <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                    style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                    {serviceapi.map(item => {
                                        const isChecked = servicoselecionado.includes(item.id_service)
                                        return (
                                            <button
                                                key={item.id_service}
                                                type='button'
                                                onClick={() => handleCheckboxChange(item.id_service)}
                                                className="d-inline align-items-center gap-7 px-3 py-2 rounded-3 border fw-medium transition-all"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    backgroundColor: isChecked ? '#EBF8FF' : '#FFFFFF',
                                                    borderColor: isChecked ? '#2664eB' : '#475569',
                                                    color: isChecked ? '#2563eb' : '#475569',
                                                    boxShadow: isChecked ? '0 0 0 1px #2563eb' : 'none',
                                                    transition: 'all 0.15s ease',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: '11px',
                                                        opacity: isChecked ? 1 : 0.4,
                                                        filter: isChecked ? 'none' : 'grayscale(100%)'
                                                    }}>
                                                    {isChecked ? '🔹' : '▫️'}
                                                </span>
                                                {item.service}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="d-flex ">
                                <label htmlFor="bookingDate" className="form-label">Data</label>
                                <DatePicker
                                    className="form-control w-40"
                                    selected={selectdata}
                                    disabled={serviceapi.length == 0 ? true : false}
                                    locale='pt-BR'
                                    onChange={(date) => setselectdata(date)}
                                    // filterDate={(apenasdiasuteis)}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText='dd/mm/yyyy'
                                    showTimeSelect={false}
                                ></DatePicker>
                            </div>
                            <div className="col-md-4 d-flex flex-colum align-items-center justify-content-center">
                                <label htmlFor="bookingHour" className="form-label align-self-start mb-3">Horarios</label>
                                {selectdata ?
                                    <select className="form-select rounded px-3" required={true} value={booking_hour} onChange={(e) => setbookhours(e.target.value)}>
                                        {Array.isArray(horariosdisponiveis) && horariosdisponiveis.map(item => {
                                            return <option key={item}>{item}</option>
                                        })}
                                    </select>
                                    :
                                    <div className="form-select rounded px-3" required={true} value={booking_hour} onChange={(e) => setbookhours(e.target.value)}>
                                        <option disabled={true}>Check...</option>
                                    </div>

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
                </div>
            </main>
        </>

    )
}