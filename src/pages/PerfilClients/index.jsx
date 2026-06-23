import { useState } from "react"
import { LoadingScreen } from "../components/loading"
import { Link } from "react-router"

export function PageClientPerfil() {
    const [loading, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    const [veiculoParaDesvincular, setVeiculoParaDesvincular] = useState(null)
    const [abaAtiva, setabaAtiva] = useState('pessoaes')
    const [client, setclient] = useState({
        id: 1,
        name: 'Joao Silva',
        cpf: '123.456.781-12',
        telefone: '(98) 98121-1211',
        email: 'joaosilva@gmail.com',
        endereco: 'Rua do Gestao, 3 - Tunitaira - 31'
    })
    const [veiculosViculado, setVeiculosViculado] = useState([
        { id_veiculo: 11, marca: 'VW', nome: "T-Cross", ano: 2024, placa: 'VWX-1232', status: 'A', logo: 'https://res.cloudinary.com/dniwjfgal/image/upload/v1780610330/fiat_vj7n1b.jpg' }
    ])
    return (
        <div className="container-fluid mt-pagae px-4">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                <div>
                    <h2 className="fw-bold m-0 text-dark">Gestão do Cliente: {client.name}</h2>
                </div>
                <Link className='btn btn-outline-primary fw-semibold px-4' to="/appointments/add">
                    Novo Agendamento
                </Link>
            </div>
            <div className="row g-4">
                <div className="col-lg-5 col-md-12">
                    <div className="card p-4 borde shadow-sm roundend-3 bg-white mb-4">
                        <div className="d-flex align-items-center">
                            <div className="bg-darks text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 user-select-none" style={{ width: '65px', height: '65px', fontSize: '26px' }}>
                                {client.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="fw-bold m-0 text-dark">{client.name}</h4>
                                <p className="text-muted m-0 small">{client.telefone}</p>
                                <p className="text-muted m-0 small"><i className="bi bi-geo-alt fill me-1"></i>{client.endereco}</p>
                            </div>
                        </div>
                    </div>
                    <ul className="nav nav-tabs border-bottom-0 mb-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link fw-semibold px-4 py-2.5 ${abaAtiva === 'pessoais' ? 'active bg-primary text-white border-primary' : 'text-secondary bg-light'}`}
                                onClick={() => setAbaAtiva('pessoais')}
                            >
                                Informações Pessoais
                            </button>
                        </li>
                        <li className="nav-item ms-1">
                            <button
                                className={`nav-link fw-semibold px-4 py-2.5 ${abaAtiva === 'historico' ? 'active bg-primary text-white border-primary' : 'text-secondary bg-light'}`}
                                onClick={() => setAbaAtiva('historico')}
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
                                            className="form-control form-control-lg bg-light"
                                            value={client.name}
                                            onChange={(e)=> setclient({...client,name:e.target.value})}
                                        ></input>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label text-secondary fw-semibold">CPF</label>
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control bg-light" value={client.cpf} readOnly></input>
                                            <button className="btn btn-primary" onClick={h}></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="text-center py-4 text-muted">
                                <i className="bi bi-journal-text fs-1 d-block mb-2"></i>
                                <p>Nenhum servico ou ordem de servico registrada para este cliente</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}