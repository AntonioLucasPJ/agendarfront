import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { Clients } from "../components/clients";
import { Pagination } from "../components/Pagination";
import { LoadingScreen } from "../components/loading";
import { ModalDelete } from "../components/Modal";

export default function ClientPage() {
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const navigate = useNavigate()
    const [clientsapi, setclientsapi] = useState([])
    const [post, setpost] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const paginate = (Number) => setCurrentPage(Number)
    const [pesquisa, setpesquisa] = useState('')
    const [filtroStatus, setfriltroStatus] = useState('Todos')
    //tools in paga
    const [loading, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)


    function Editar(id_user, client, cpf, email, telefone, endereco) {
        navigate(`/clientsperfil/${id_user}`, {
            state: {
                perfilclient: client,
                perfilcpf: cpf,
                perfilemail: email,
                perfiltelefone: telefone,
                perfilendereco: endereco
            }
        })
    }
    function Delete() {
        console.log('teste')
    }
    const clientsFiltrados =
        clientsapi.filter(client => {
            const termo = pesquisa.toLowerCase()
            const bateTexto =
                (client.name?.toLowerCase().includes(termo) || '')
                || (client.email?.toLowerCase().includes(termo) || '')
                || (client.cpf?.includes(termo) || '')
                || (client.telefone.includes(termo) || '')
            const bateStatus = filtroStatus === 'Todos' || client.status === filtroStatus
            return bateTexto && bateStatus
        });
    useEffect(() => {
        async function LoadClient() {
            setloading(true)
            try {
                await awaiting(1500)
                const res = await api.get('/users/profile')
                setpost(res.data)
                let indexoflastpost = CurrentPage * postPerPage
                let indexoffirtpost = indexoflastpost - postPerPage
                if (indexoffirtpost >= res.data.length) {
                    indexoffirtpost = 0;
                    indexoflastpost = postPerPage;
                }
                const currentPost = res.data.slice(indexoffirtpost, indexoflastpost)
                setclientsapi(currentPost)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
            }

        }
        LoadClient()
    }, [CurrentPage])

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
                    <h2 className="d-inline user-select-none">Clientes</h2>
                    <Link
                        className='btn btn-outline-primary ms-5 mb-2'
                        to="/appointments/add"
                    >Adicionar Clientes</Link>
                </div>
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
                            placeholder="Buscar por Nome, CPF ou telefone..."
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
            {clientsapi.length > 0 && (
                <div>
                    <div className="user-select-none">
                        <table className="table table-hover user-select-none">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col" className="text-end">Status</th>

                                </tr>
                            </thead>
                            {clientsFiltrados.length > 0 ? (
                                <tbody>
                                    {clientsFiltrados.map(item => {
                                        return (
                                            <Clients
                                                key={item.id_user}
                                                id_user={item.id_user}
                                                client={item.name}
                                                cpf={item.cpf}
                                                email={item.email}
                                                telefone={item.telefone}
                                                endereco={item.endereco}
                                                clickedit={(id_user, client, cpf, email, telefone, endereco) => Editar(id_user, client, cpf, email, telefone, endereco)}
                                                clickdelete={Delete}
                                            ></Clients>
                                        )
                                    })}
                                </tbody>
                            ) : (
                                <tr>
                                    <td colSpan='6' className="text-center py-5 bg-light-subtle">
                                        <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                            <i className="bi bi=search-hear fs-1 mb-3 text-secondary"></i>
                                            <h5 className="fw-bold text-dark mb-1">Nenhum usuario encontrado</h5>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </table>
                        <Pagination postPerPage={postPerPage} totalPost={post.length} paginate={paginate}></Pagination>
                        {clientsapi == '' ?
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