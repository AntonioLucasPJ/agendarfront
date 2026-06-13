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

export function Pageservice() {
    const [services, setservices] = useState([])
    const [loading, setloading] = useState(false)
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
                await new Promise(resolve => setTimeout(resolve, 1500))
                const res = await api.get('/servicessearch')
                api.defaults.headers.Authorization = `Bearer ${tokenreal}`
                setservices(res.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                seterror(true)
                setloading(false)
            }

        }
        LoadService()
    }, [])
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
            console.log(error)
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
            {services.length > 0 && (
                <div>
                    <div>
                        <h2 className="d-inline user-select-none">Servicos</h2>
                        <Link
                            className='btn btn-outline-primary ms-5 mb-2'
                            to="/services/add"
                        >Novo servico</Link>
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

                        <tbody>
                            {services.map(item => {
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

                    </table>
                </div>
            )}
        </div>
    )
}