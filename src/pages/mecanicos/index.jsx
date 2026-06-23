import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { use, useContext, useEffect, useState } from "react";
import { ContextMecanicos } from "../../context/Mecanicos";
import { Mecanicos } from "../components/mecanicos";
import { ModalDelete } from "../components/Modal/index.jsx"
import { LoadingScreen } from "../components/loading";
import { api } from "../../service/api.js";
import { AlertMessage } from "../components/Alert/index.jsx";
import { Pagination } from "../components/Pagination/index.jsx";

export default function PageMecanicos() {
    //control page
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const paginate = (Number) => setCurrentPage(Number)
    const [pesquisa, setpesquisa] = useState('')
    const [filtroStatus, setfriltroStatus] = useState('Todos')

    const { mecanicos, SearchMecanicos, post, setpost } = useContext(ContextMecanicos)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [laoding, setloading] = useState(false)
    const [alert, setalert] = useState(false)
    const [alertmsg, setalertmsg] = useState('')
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const carregardados = async () => {
            setloading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                SearchMecanicos()
            } catch (error) {
                console.log('Erro de processamento de tela')
            } finally {
                setloading(false)
            }
        }
        carregardados()
    }, [])
    const clientsFiltrados =
        post.filter(ve => {
            const termo = pesquisa.toLowerCase()
            const bateTexto =
                (ve.name?.toLowerCase().includes(termo) || '')
                || (ve.services?.toLowerCase().includes(termo) || '')
            const bateStatus = filtroStatus === 'Todos' || ve.situacao === filtroStatus
            return bateTexto && bateStatus
        });
    let indexoflastpost = CurrentPage * postPerPage
    let indexoffirtpost = indexoflastpost - postPerPage
    const clientsExibidos = clientsFiltrados.slice(indexoffirtpost, indexoflastpost)
    function EditLoad(id_mecanico, name, genero, cpf, email, telefone, titulo_prossional, experiencia, descricao, client) {
        navigate('/mecanicos/add/' + id_mecanico, {
            state: {
                nmecanic: name,
                mgenero: genero,
                mcpf: cpf,
                memail: email,
                mtelefone: telefone,
                mtituloprofissional: titulo_prossional,
                mexperiencia: experiencia,
                mdescricao: descricao
            }
        })
    }
    async function DeleteService() {
        setloading(true)
        try {
            await awaiting(2500)
            const res = await api.delete(`/mecanicos/delete/${iddelete}`)
            setalertdelete(false)
            setloading(false)
            window.location.reload()
            console.log(res.data)
        } catch (error) {
            setalertdelete(false)
            setloading(false)
            setalertmsg(error.response.data.message)
            setTimeout(() => {
                setalert(!alert)
            }, 2000)

        }
    }
    async function DeletLoad(id_service) {
        setalertdelete(true)
        setiddelete(id_service)
    }
    return (
        <div className="container-fluid mt-page">
            {laoding && (
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
            {alert && (
                <AlertMessage msg={alertmsg}></AlertMessage>
            )}
            <Navbar></Navbar>
            <div>
                <div>
                    <h2 className="d-inline">Mecanicos</h2>
                    <Link
                        to='/mecanicos/add'
                        className="btn btn-outline-primary ms-5 mb-2"
                    >Adicionar mecanico
                    </Link>
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
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Servicos</th>
                            <th scope="col">Situação</th>
                        </tr>
                    </thead>
                    {clientsExibidos.length > 0 ? (
                        <tbody>
                            {clientsFiltrados.map(item => {
                                return (
                                    <Mecanicos
                                        key={item.id_mecanico}
                                        id_mecanico={item.id_mecanico}
                                        name={item.name}
                                        services={item.services}
                                        ativo={item.ativo}
                                        cpf={item.cpf}
                                        email={item.email}
                                        telefone={item.telefone}
                                        genero={item.genero}
                                        descricao={item.descricao}
                                        titulo_profissional={item.titulo_profissional}
                                        experiencia={item.experiencia}
                                        clickdelete={(id) => DeletLoad(id)}
                                        clickedit={(id, name, genero, cpf, email, telefone, titulo_prossional, experiencia, descricao) => EditLoad(id, name, genero, cpf, email, telefone, titulo_prossional, experiencia, descricao)}
                                    >
                                    </Mecanicos>
                                )
                            })}
                        </tbody>
                    ) : (
                        <tr>
                            <td colSpan='6' className="text-center py-5 bg-light-subtle">
                                <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                    <i className="bi bi=search-hear fs-1 mb-3 text-secondary"></i>
                                    <h5 className="fw-bold text-dark mb-1">Nenhum mecanico encontrado</h5>
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
