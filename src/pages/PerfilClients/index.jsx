import { useEffect, useState } from "react"
import { LoadingScreen } from "../components/loading"
import { Link, useLocation, useParams } from "react-router"
import { Navbar } from "../components/navbar"
import { api } from "../../service/api"
import { ModalAddVehicle } from "../components/ModalVehicle"

export function PageClientPerfil() {
    const location = useLocation()
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const { perfilclient, perfilcpf, perfilemail, perfiltelefone, perfilendereco } = location.state || {}
    const { id_user } = useParams()
    const [loading, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    const [modalaberto, setmodalaberto] = useState(false)
    const [veiculoParaDesvincular, setVeiculoParaDesvincular] = useState(null)
    const [abaAtiva, setabaAtiva] = useState('pessoas')
    const [veiculosVinculados, setveiculosVinculados] = useState([])
    function SalvarVeiculoNoBanco() {
        console.log('Salva')
    }
    useEffect(() => {
        setveiculosVinculados([])
        async function LoadVehicle() {
            setloading(true)
            try {
                await awaiting(1500)
                const res = await api.get('/vehicle/searchvehicle', {
                    id_user: id_user
                })
                setloading(false)

                setveiculosVinculados(res.data)
            } catch (error) {
                setloading(false)
                console.log(error)
            } finally {
                setloading(false)
            }

        }
        LoadVehicle()
    }, [])
    return (
        <div className="container-fluid mt-page">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            <Navbar></Navbar>
            <ModalAddVehicle
                isOpen={modalaberto}
                onClose={() => setmodalaberto(!modalaberto)}
                onConfirm={SalvarVeiculoNoBanco}
                nomeClient={'teste'}
            ></ModalAddVehicle>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                <div>
                    <h2 className="fw-bold m-0 text-dark">Gestão do Cliente: {name}</h2>
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
                                {name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="fw-bold m-0 text-dark">{perfilclient}</h4>
                                <p className="text-muted m-0 small">{perfiltelefone}</p>
                                <p className="text-muted m-0 small"><i className="bi bi-geo-alt fill me-1"></i>{perfilendereco}</p>
                            </div>
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
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label text-secondary fw-semibold">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            value={perfilclient}
                                            onChange={(e) => setclient({ ...client, name: e.target.value })}
                                        ></input>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label text-secondary fw-semibold">CPF</label>
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control bg-light" value={perfilcpf} readOnly></input>
                                            <button className="btn btn-primary" onClick={''}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label text-secondary fw-semibold">Telefone</label>
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control bg-light" value={perfiltelefone} readOnly></input>
                                            <button className="btn btn-primary" onClick={''}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label text-secondary fw-semibold">Email</label>
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control bg-light" value={perfilemail} readOnly></input>
                                            <button className="btn btn-primary" onClick={''}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-muted">
                                <i className="bi bi-journal-text fs-1 d-block mb-2"></i>
                                <p>Nenhum servico ou ordem de servico registrada para este cliente</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg col-md-12">
                    <div className="card p-4 border shadow-sm rounded-3 bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold m-0 text-dark">Carros do Cliente</h4>
                            <button className="btn btn-sm bt-primary fw-smibold px-3 py-2"
                            onClick={()=> setmodalaberto(true)}>
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
                                    {veiculosVinculados.map((item) => (
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
                                                <span className={`badge px-2.5 py-1.5 rounded-pill ${item.ativo === 'A' ? 'bg-sucess-subtle text-sucess' : 'bg-danger-subtle text-danger'}`}>
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
                                                    onClick={() => handleDesvincularVeiculo(item.id_veiculo)}
                                                >
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}