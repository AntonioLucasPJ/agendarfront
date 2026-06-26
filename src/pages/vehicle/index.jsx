import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { Vehicles } from "../components/Vehicle";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { ModalDelete } from "../components/Modal";
import { LoadingScreen } from "../components/loading";
import { Pagination } from "../components/Pagination";
import { AlertMessage } from "../components/Alert";

export default function PageVehicle() {
    //control page
    const [post, setpost] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const paginate = (Number) => setCurrentPage(Number)
    const [pesquisa, setpesquisa] = useState('')
    const [filtroStatus, setfriltroStatus] = useState('Todos')

    const [loading, setloading] = useState(false)
    const [alert,setalert] = useState(false)
    const [msgalert,setmsgalert] = useState('')
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const [vehicle, setvehicle] = useState([])
    const navigate = useNavigate()
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    useEffect(() => {
        setloading(true)
        async function LoadData() {
            await awaiting(1500)
            const res = await api.get('/vehiclesall')
            setloading(false)
            setpost(res.data)

        }
        LoadData()
    }, [CurrentPage])

    const clientsFiltrados =
        post.filter(ve => {
            const termo = pesquisa.toLowerCase()
            const bateTexto =
                (ve.brand?.toLowerCase().includes(termo) || '')
                || (ve.model?.toLowerCase().includes(termo) || '')
                || (String(ve.year)?.toLowerCase().includes(termo) || '')

            const bateStatus = filtroStatus === 'Todos' || ve.status === filtroStatus
            return bateTexto && bateStatus
        });
    let indexoflastpost = CurrentPage * postPerPage
    let indexoffirtpost = indexoflastpost - postPerPage
    const clientsExibidos = clientsFiltrados.slice(indexoffirtpost, indexoflastpost)
    async function DeletLoad(id) {
        setalertdelete(true)
        setiddelete(id)
    }
    async function DeleteService() {
        setloading(true)
        try {
            await awaiting(2500)
            const res = await api.delete(`/vehicle/delete/${iddelete}`)
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
    async function EditLoad(id_vehicle, brand, brandid, model, year, status) {
        navigate('/vehicles/add/' + id_vehicle, {
            state: {
                editbrand: brandid,
                editmodel: model,
                edityear: year,
                editstatus: status
            }
        })
    }
    return (
        <div className="container-fluid mt-page">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja deletar esse veiculo?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => DeleteService()}
                ></ModalDelete>
            )}
            <Navbar></Navbar>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Veiculos</h2>
                    <Link
                        to='/vehicles/add'
                        className="btn btn-outline-primary ms-5 mb-2"
                    >Adicionar Veiculo
                    </Link>
                </div>
            </div>
            {msgalert && (
                <AlertMessage msg={msgalert}></AlertMessage>
            )}
            <div className="row g-3 mb-4 align-items-center">
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Buscar por Marca, Modelo ou Ano..."
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
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Veiculo</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Ano</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    {clientsExibidos.length > 0 ? (
                        <tbody>
                            {clientsExibidos.map(item => {
                                return (
                                    <Vehicles
                                        key={item.id}
                                        id={item.id}
                                        logo={item.logo}
                                        brand={item.brand}
                                        brandid={item.id_brand}
                                        model={item.model}
                                        car={item.car}
                                        year={item.year}
                                        status={item.status}
                                        clickdelete={(id) => DeletLoad(id)}
                                        clickedit={(id, brand, brandid, model, year, status) => EditLoad(id, brand, brandid, model, year, status)}
                                    >
                                    </Vehicles>
                                )
                            })}
                        </tbody>
                    ) : (
                        <tr>
                            <td colSpan='6' className="text-center py-5 bg-light-subtle">
                                <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                    <i className="bi bi=search-hear fs-1 mb-3 text-secondary"></i>
                                    <h5 className="fw-bold text-dark mb-1">Nenhum veiculo encontrado</h5>
                                </div>
                            </td>
                        </tr>
                    )}
                </table>
                <Pagination postPerPage={postPerPage} totalPost={clientsFiltrados.length} paginate={paginate}></Pagination>

            </div>
        </div>
    )
}