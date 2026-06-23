import { useContext, useEffect, useState } from "react"
import { FaLeaf, FaSlack } from "react-icons/fa"
import { FaS } from "react-icons/fa6"
import { LoadingScreen } from "../components/loading"
import { Navbar } from "../components/navbar"
import { api } from "../../service/api"
import { UserContext } from "../../context/UserLogin"
import { Link, useNavigate } from "react-router"
import { SearchService } from "../components/SearchService/index.jsx"
import { setDate } from "date-fns"
import { ModalDelete } from "../components/Modal/index.jsx"
import { AlertMessage } from "../components/Alert/index.jsx"
import { Pagination } from "../components/Pagination/index.jsx"

export function Pageservice() {
    //control page
    const [post, setpost] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const paginate = (Number) => setCurrentPage(Number)
    const [pesquisa, setpesquisa] = useState('')
    const [filtroStatus, setfriltroStatus] = useState('Todos')

    ///
    const [services, setservices] = useState([])
    const [loading, setloading] = useState(false)
    const [alert, setalert] = useState(false)
    const [msgalert, setmsgalert] = useState('')
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const [error, seterror] = useState(false)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const navigate = useNavigate()
    const { token } = useContext(UserContext)
    const tokenreal = token || localStorage.getItem("token")

    useEffect(() => {
        async function LoadService() {
            try {
                setloading(true)
                await awaiting(1500)
                const res = await api.get('/servicessearch')
                api.defaults.headers.Authorization = `Bearer ${tokenreal}`
                setpost(res.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                seterror(true)
                setloading(false)
            }

        }
        LoadService()
    }, [])
    const clientsFiltrados =
        post.filter(ve => {
            const termo = pesquisa.toLowerCase()
            const bateTexto =
                (ve.service?.toLowerCase().includes(termo) || '')
                || (ve.description?.toLowerCase().includes(termo) || '')
            const bateStatus = filtroStatus === 'Todos' || ve.status === filtroStatus
            return bateTexto && bateStatus
        });
    let indexoflastpost = CurrentPage * postPerPage
    let indexoffirtpost = indexoflastpost - postPerPage
    const clientsExibidos = clientsFiltrados.slice(indexoffirtpost, indexoflastpost)
    function EditLoad(id_service, service, description, icone_id, status, client) {
        navigate('/services/add/' + id_service, {
            state: {
                editserv: service,
                editdesc: description,
                editicon: icone_id,
                editstatus: status
            }
        })
    }
    async function DeleteService() {
        setloading(true)
        try {
            await awaiting(2500)
            const res = await api.delete(`/servicessearch/${iddelete}`)
            setalertdelete(false)
            setloading(false)
            window.location.reload()
            console.log(res.data)
        } catch (error) {
            setalert(true)
            setmsgalert(error.response.data.message)
            console.log(error.response.data.message)
            setTimeout(() => {
                setalert(!alert)
            }, 1000)
            setalertdelete(false)
            setloading(false)
        }
    }
    async function DeletLoad(id_service) {
        setalertdelete(true)
        setiddelete(id_service)
    }
    return (
        <div className="container-fluid mt-page">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja deletar esse servico?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => DeleteService()}
                ></ModalDelete>
            )}
            <Navbar></Navbar>
            {alert && (
                <AlertMessage msg={msgalert}></AlertMessage>
            )}
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
            )}
            {post.length > 0 && (
                <div>
                    <div>
                        <h2 className="d-inline user-select-none">Servicos</h2>
                        <Link
                            className='btn btn-outline-primary ms-5 mb-2'
                            to="/services/add"
                        >Novo servico</Link>
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
                                    placeholder="Buscar por Serviços,Descrição..."
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
                                <option value='A'>Ativo</option>
                                <option value='I'>Inativo</option>
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Icone</th>
                                <th scope="col">Service</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        {clientsFiltrados.length > 0 ? (
                            <tbody>
                                {clientsExibidos.map(item => {
                                    return (
                                        <SearchService
                                            key={item.id_service}
                                            id_service={item.id_service}
                                            service={item.service}
                                            description={item.description}
                                            icone_id={item.icone_id}
                                            status={item.status}
                                            clickedit={(id, service, description, icone_id, status) => EditLoad(id, service, description, icone_id, status)}
                                            clickdelete={(id_service) => DeletLoad(id_service)}
                                        >
                                        </SearchService>
                                    )
                                })}
                            </tbody>
                        ) : (
                            <tr>
                                <td colSpan='6' className="text-center py-5 bg-light-subtle">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                        <i className="bi bi=search-hear fs-1 mb-3 text-secondary"></i>
                                        <h5 className="fw-bold text-dark mb-1">Nenhum servicos encontrado</h5>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </table>
                    <Pagination postPerPage={postPerPage} totalPost={clientsFiltrados.length} paginate={paginate}></Pagination>
                </div>
            )}
        </div>
    )
}