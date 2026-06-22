import { Link } from "react-router";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { Clients } from "../components/clients";
import { Pagination } from "../components/Pagination";
import { LoadingScreen } from "../components/loading";
import { ModalDelete } from "../components/Modal";

export default function ClientPage() {
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const [clientsapi, setclientsapi] = useState([])
    const [post, setpost] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const paginate = (Number) => setCurrentPage(Number)

    //tools in paga
    const [loading, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    function Editar() {
        console.log('teste')
    }
    function Delete() {
        console.log('teste')
    }
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
            <div>
                <h2 className="d-inline user-select-none">Clientes</h2>
                <p className="text-muted m-0">Gerenci os perfis, contatos</p>
            </div>
            <Link
                className='btn btn-outline-primary ms-5 mb-2'
                to="/appointments/add"
            >Novo Agendamento</Link>

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
                            {clientsapi && (
                                <tbody>
                                    {clientsapi.map(item => {
                                        return (
                                            <Clients
                                                key={item.id_user}
                                                id_user={item.id_user}
                                                client={item.name}
                                                cpf={item.cpf}
                                                email={item.email}
                                                telefone={item.telefone}
                                                clickedit={Editar}
                                                clickdelete={Delete}
                                            ></Clients>
                                        )
                                    })}
                                </tbody>
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