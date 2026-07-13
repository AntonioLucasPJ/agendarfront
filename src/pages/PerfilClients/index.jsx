import { use, useEffect, useState } from "react"
import { LoadingScreen } from "../components/loading"
import { Link, useLocation, useParams } from "react-router"
import { Navbar } from "../components/navbar"
import { api } from "../../service/api"
import { ModalAddVehicle } from "../components/ModalVehicle"
import { ModalDelete } from "../components/Modal"
import { AlertMessage } from "../components/Alert"
import { id, tr } from "date-fns/locale"
import RedefinidorSenha from "../components/ModalRedefinir"

export function PageClientPerfil() {
    const location = useLocation()
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    //Redefinir Senha
    const [mostrarmodalsenha, setmostrarmodalsenha] = useState(false)
    const [novasenha, setnovasenha] = useState('')
    const [confirmasenha, setconfirmasenha] = useState('')
    const [errorsenha, seterrosenha] = useState('')
    //Informações Pessoais
    const { perfilclient, perfilcpf, perfilemail, perfiltelefone, perfilendereco } = location.state || {}
    const [client, setclient] = useState([])
    const [editandonome, seteditandonome] = useState(false)
    const [editandotelefone, seteditandotelefone] = useState(false)
    const [editandocpf, seteditandocpf] = useState(false)
    const [editandoemail, seteditandoemail] = useState(false)
    ///
    const { id_user } = useParams() || ''
    const [loading, setloading] = useState(false)
    const [alert, setalert] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const [alertmsg, setalertmsg] = useState('')
    const [imagepreview, setimagepreview] = useState('')
    const [modalaberto, setmodalaberto] = useState(false)
    const [veiculoParaDesvincular, setVeiculoParaDesvincular] = useState(null)
    const [abaAtiva, setabaAtiva] = useState('historico')
    const [veiculosVinculados, setveiculosVinculados] = useState([])
    //Aba historico
    const [historicosServicos, sethistoricosServicos] = useState([])
    async function SalvarVeiculoNoBanco(dadosrecebidos) {
        const { veiculoselecionado, cor, placa } = dadosrecebidos
        setloading(true)
        try {
            const res = await api.post('/vehicle/singupvehicle', {
                user_id: id_user,
                model_id: veiculoselecionado.id,
                car_license_plate: placa,
                color: cor
            })
            await awaiting(1500)
            setloading(false)
            setalert(!alert)
            setalertmsg(res.data.message)
            await awaiting(2000)
            window.location.reload()

        } catch (error) {
            await awaiting(1000)
            setalertmsg(error.response.data.message)
            setalert(!alert)
            setloading(false)
        }
    }
    async function handleDesvincularVeiculo() {
        try {
            setloading(true)
            await awaiting(2000)
            const res = await api.delete(`vehicle/clientdelete/${iddelete}`)
            setloading(false)
            setalert(!alert)
            setalertmsg(res.data.message)
            await awaiting(1000)
            setalertdelete(!alertdelete)
            window.location.reload()
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    function LaodDelete(id) {
        setalertdelete(!alertdelete)
        setiddelete(id)
    }
    async function handleAtualizar(e) {
        if (e) e.preventDefault()
        setloading(true)
        try {
            const payload = {
                name: client.name,
                email: client.email,
                cpf: client.cpf,
                telefone: client.telefone
            }
            await awaiting(1500)
            const res = await api.put(`/users/edit/${id_user}`, payload)
            setloading(false)
            if (res.data) {
                const usuarioatualizado = res.data.edit[0]
                setclient({
                    name: usuarioatualizado.name,
                    cpf: usuarioatualizado.cpf,
                    telefone: usuarioatualizado.telefone,
                    email: usuarioatualizado.email
                })
                seteditandonome(false)
                seteditandocpf(false)
                seteditandotelefone(false)
                seteditandoemail(false)
            } else {
                setclient(payload)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function LoadVehicle() {
            setloading(true)
            try {
                await awaiting(1500)
                const res = await api.post(`/vehicle/searchvehicle/${id_user}`,)
                setloading(false)
                setveiculosVinculados(res.data)
            } catch (error) {
                setloading(false)
                console.log(error)
            } finally {
                setloading(false)
            }

        }
        async function LoadServices() {
            try {
                const res = await api.get(`/appointements/${id_user}`)
                sethistoricosServicos(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (id_user) {
            LoadVehicle()
            LoadServices()
        }
    }, [])
    useEffect(() => {
        if (id_user) {
            const novoDados = {
                name: perfilclient || '',
                cpf: perfilcpf || '',
                telefone: perfiltelefone || '',
                email: perfilemail || ''
            };
            setclient(novoDados)
        }
    }, [id_user])
    const formatarCPF = (value) => {
        // 1. Remove tudo o que não for número
        const apenasNumeros = value.replace(/\D/g, "");

        // 2. Limita o máximo a 11 dígitos numéricos
        const numerosLimitados = apenasNumeros.slice(0, 11);

        // 3. Aplica a máscara progressivamente baseado no tamanho
        return numerosLimitados
            .replace(/(\d{3})(\d)/, "$1.$2")       // Coloca o primeiro ponto
            .replace(/(\d{3})(\d)/, "$1.$2")       // Coloca o segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o hífen
    };
    const formatarTelefone = (value) => {
        // 1. Remove tudo o que não for número
        const apenasNumeros = value.replace(/\D/g, "");

        // 2. Limita o máximo a 11 dígitos numéricos (DDD + 9 dígitos)
        const numerosLimitados = apenasNumeros.slice(0, 11);

        // 3. Aplica a máscara dinamicamente com base na quantidade de números
        if (numerosLimitados.length <= 10) {
            // Formato para Telefone Fixo: (XX) XXXX-XXXX
            return numerosLimitados
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            // Formato para Celular: (XX) XXXXX-XXXX
            return numerosLimitados
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2");
        }
    };
    const FormatarEmail = (value) => {
        if (value.includes("@")) {
            return value
        } else {
            return `Email nao valido`
        }
    }
    async function handleRedefinirSenha(informacoes) {
        if (informacoes.novasenha.length < 6) {
            seterrosenha("A senha deve ter no miminio 6 digitos")
            return;
        }
        if(informacoes.novasenha !== informacoes.confirmarsenha){
            seterrosenha("As senhas nao sao iguais")
            return;
        }
        setloading(true)
        try {
            const res = res.data
        } catch (error) {
            console.log(error)
        }
    }
    
    function CleanModalRedefinirsenha(){
        seterrosenha('')
        setmostrarmodalsenha(!mostrarmodalsenha)
    }
    return (
        <div className="container-fluid mt-page">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}

            <Navbar></Navbar>
            <ModalAddVehicle
                isOpen={modalaberto}
                onClose={() => setmodalaberto(!modalaberto)}
                onConfirm={(veiculoselecionado, placa, cor) => SalvarVeiculoNoBanco(veiculoselecionado, placa, cor)}
                nomeClient={'teste'}
            ></ModalAddVehicle>
            {mostrarmodalsenha && (
                <RedefinidorSenha
                    handleRedefinirSenha={(e) => handleRedefinirSenha(e)}
                    setMostrarModalSenha={() => CleanModalRedefinirsenha()}
                    erroSenha={errorsenha}
                ></RedefinidorSenha>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja excluir esse veiculo?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => handleDesvincularVeiculo()}
                ></ModalDelete>
            )}
            {alert && (
                <AlertMessage msg={alertmsg}></AlertMessage>
            )}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                <div>
                    <h2 className="fw-bold m-0 text-dark">Gestão do Cliente:</h2>
                </div>
                <Link className='btn btn-outline-primary fw-semibold px-4' to="/appointments/add">
                    Novo Agendamento
                </Link>
            </div>
            <div className="row g-4">
                <div className="col-lg-5 cofl-md-12">
                    <div className="card p-4 borde shadow-sm roundend-3 bg-white mb-4">
                        <div className="d-flex align-items-center">
                            <div className="bg-darks text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 user-select-none" style={{ width: '65px', height: '65px', fontSize: '26px' }}>
                                {client.name}
                            </div>
                            <div>
                                <h4 className="fw-bold m-0 text-dark">{client.name}</h4>
                                <p className="text-muted m-0 small">
                                    <i className="bi bi-telephone me-2"></i>{client.telefone}
                                </p>
                                <p className="text-muted m-0 small">
                                    <i className="bi bi-envelope me-2"></i>{client.email}
                                </p>
                                <p className="text-muted m-0 small">
                                    <i className="bi bi-geo-alt fill me-1"></i>{perfilendereco}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                                onClick={() => setmostrarmodalsenha(true)}
                            >
                                <i className="bi bi-shield-lock"></i>
                                Redefinir Senha do usuario
                            </button>
                        </div>
                    </div>
                    <ul className="nav nav-tabs border-bottom-0 mb-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link fw-semibold px-4 py-2.5 ${abaAtiva === 'pessoais' ? 'active bg-primary text-white border-primary' : 'text-secondary bg-light'}`}
                                onClick={() => setabaAtiva('pessoais')}
                            >
                                Informações Pessoais
                            </button>
                        </li>
                        <li className="nav-item ms-1">
                            <button
                                className={`nav-link fw-semibold px-4 py-2.5 ${abaAtiva === 'historico' ? 'active bg-primary text-white border-primary' : 'text-secondary bg-light'}`}
                                onClick={() => setabaAtiva('historico')}
                            >
                                Histórico de Serviços
                            </button>
                        </li>
                    </ul>
                    <div className="card p-4 border border-top border-lighy shadow-sm rounded-bottom-3 bg-white">
                        {abaAtiva === 'pessoais' ? (
                            <div>
                                <h4 className="fw-bold text-dark mb-4">Dados Básicos</h4>
                                <form onSubmit={(e) => handleAtualizar(e)}>
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <label className="form-label text-secondary fw-semibold">Nome</label>
                                            <div className="input-group input-group-lg">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light"
                                                    value={client.name || ''}
                                                    onChange={(e) => setclient({ ...client, name: e.target.value })}
                                                    readOnly={!editandonome}
                                                ></input>
                                                <button className={editandonome ? 'btn btn-success' : 'btn btn-primary'}
                                                    type="button"
                                                    onClick={() => seteditandonome(!editandonome)}
                                                    disabled={client.name.length <= 6 ? true : false}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>

                                            </div>
                                            {client.name.length <= 6 && (
                                                <span >O nome deve ter no minino 6 caracteres</span>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label text-secondary fw-semibold">CPF</label>
                                            <div className="input-group input-group-lg">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light"
                                                    value={client.cpf || ''}
                                                    placeholder="000.000.000-00"
                                                    maxLength={14}
                                                    onChange={(e) => {
                                                        const formatado = formatarCPF(e.target.value)
                                                        setclient({ ...client, cpf: formatado })
                                                    }}
                                                    readOnly={!editandocpf}
                                                ></input>
                                                <button className={editandocpf ? 'btn btn-success' : 'btn btn-primary'}
                                                    type="button"
                                                    onClick={() => seteditandocpf(!editandocpf)}
                                                    disabled={client.cpf.length < 14 ? true : false}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                            </div>
                                            {client.cpf.length < 14 && (
                                                <span >O CPF deve ter  11 caracteres</span>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label text-secondary fw-semibold">Telefone</label>
                                            <div className="input-group input-group-lg ">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light"
                                                    value={client.telefone || ''}
                                                    readOnly={!editandotelefone}
                                                    maxLength={15}
                                                    onChange={(e) => {
                                                        const formatel = formatarTelefone(e.target.value)
                                                        setclient({ ...client, telefone: formatel })
                                                    }}
                                                ></input>
                                                <button className={editandotelefone ? "btn btn-success" : "btn btn-primary"}
                                                    type="button" onClick={() => seteditandotelefone(!editandotelefone)}
                                                    disabled={client.telefone.length < 11 ? true : false}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                            </div>
                                            {client.telefone.length < 15 && (
                                                <span >Coloque o DD + 9 + Numero</span>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label text-secondary fw-semibold">Email</label>
                                            <div className="input-group input-group-lg">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light"
                                                    value={client.email || ''}
                                                    readOnly={!editandoemail}
                                                    onChange={(e) => {
                                                        setclient({ ...client, email: e.target.value })
                                                    }}
                                                ></input>
                                                <button
                                                    className={editandoemail ? 'btn btn-success' : 'btn btn-primary'}
                                                    onClick={() => seteditandoemail(!editandoemail)}
                                                    type="button"
                                                    disabled={!client.email.includes("@") ? true : false}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                            </div>
                                            {!client.email.includes('@') && (
                                                <span >Digite @ + dominio + .com</span>
                                            )}
                                        </div>
                                        <button
                                            className={`btn ${editandocpf ? 'btn-success' : 'btn-primary'}`}
                                            type="submit"
                                            onClick={() => seteditandocpf(!editandocpf)}
                                        >
                                            <i className={editandocpf ? 'bi bi-check-lg me-2' : 'bi bi-prencil-square'}></i>
                                            Salvar Alteracoes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            ''
                        )}
                        {abaAtiva === 'historico' ? (
                            <div>
                                <div>
                                    <h4 className="fw-bold text-dark m-0">Historico de Ordem de servicos</h4>
                                    <span className="badge bg-primary rounded-pill px-3 py-2">
                                        {historicosServicos.length} Registro(s)
                                    </span>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead>
                                            <tr className="text-secondary small fw-bold">
                                                <th scope="col" style={{ width: '60px' }}>OS</th>
                                                <th scope="col">Veiculo</th>
                                                <th scope="col">Servicos Executados</th>
                                                <th scope="col">Data</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Status</th>
                                                <th scope="col" className="text-end" style={{ width: '100px' }}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {historicosServicos.length > 0 ? (
                                                historicosServicos.map((item) => (
                                                    <tr key={item.id_appointment}>
                                                        <td className="text-muted fw-semibold">#{item.id_appointment}</td>
                                                        <td>
                                                            <span className="fw-bold text-dark d-block">{item.id_appointment}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-truncate d-inline-block" style={{ maxWidth: '250px' }}>
                                                                {item.service}
                                                            </span>
                                                        </td>
                                                        <td>{item.booking_date}</td>
                                                        <td>'Sem cobranca'</td>
                                                        <td>{item.status}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='7' className="text-center py-5">
                                                        <div className="text-center py-4 text-muted">
                                                            <i className="bi bi-journal-text fs-1 d-block mb-2"></i>
                                                            <h4>Nenhum servico ou ordem de servico registrada para este cliente</h4>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <div className="col-lg col-md-12">
                    <div className="card p-4 border shadow-sm rounded-3 bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold m-0 text-dark">Carros do Cliente</h4>
                            <button className="btn btn-sm bt-primary fw-smibold px-3 py-2"
                                onClick={() => setmodalaberto(true)}>
                                <i className="bi bi-plus-circle-fill me-2"></i>Veiculo
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr className="text-secondary small fw-bold">
                                        <th scope="col" style={{ width: '40px' }}>id</th>
                                        <th scope="col" style={{ width: '40px' }}>Marca</th>
                                        <th scope="col">Veiculo</th>
                                        <th scope="col">Ano</th>
                                        <th scope="col">Placa</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="text-end" style={{ width: '180px' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {veiculosVinculados && veiculosVinculados.length > 0 ? (
                                        veiculosVinculados.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-muted fw-semibold">{item.id}</td>
                                                <td>
                                                    <img
                                                        src={item.imagem_url}
                                                        alt={item.marca}
                                                        style={{ width: '35px', height: '35px', objectFit: 'contain' }}
                                                        onError={(e) => { e.target.src }}
                                                    ></img>
                                                </td>
                                                <td>
                                                    <span className="fw-bold text-dark">{item.model}</span>
                                                </td>
                                                <td>{item.year}</td>
                                                <td>
                                                    <span className="badge bg-light text-dark border font-monospace px-2.5 py-1.5">{item.license_plate}</span>
                                                </td>
                                                <td>
                                                    <span className={`badge px-3 py-2 rounded-pill ${item.status === 'A' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                        <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i>
                                                        {item.status === 'A' ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    {/* Atalho rápido para ver ordens de serviço do carro */}
                                                    <button className="btn btn-primary btn-sm me-1 fw-semibold px-2.5">
                                                        <i className="bi bi-tools me-1"></i> Serviços
                                                    </button>
                                                    {/* Botões padrão de Ação da Oficina */}
                                                    <button className="btn btn-outline-primary btn-sm me-1" title="Editar Veículo">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        title="Desvincular Veículo"
                                                        onClick={() => LaodDelete(item.id)}
                                                    >
                                                        <i className="bi bi-trash3-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-5 bg-light-subtle rounded-bottom">
                                                <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                                    <i className="bi bi-car-front fs-1 text-secondary mb-3 opacity-50"></i>
                                                    <h6 className="fw-bold text-dark mb-1">Nenhum veículo vinculado</h6>
                                                    <p className="small text-muted mb-3" style={{ maxWidth: '280px' }}>
                                                        Este cliente ainda não possui carros associados ao perfil dele nesta oficina.
                                                    </p>
                                                    <button
                                                        className="btn btn-sm btn-primary fw-semibold px-3"
                                                        onClick={() => setmodalaberto(true)}
                                                    >
                                                        <i className="bi bi-plus-circle me-1"></i> Vincular Primeiro Veículo
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}