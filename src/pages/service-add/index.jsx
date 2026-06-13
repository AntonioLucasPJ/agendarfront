import { useContext, useEffect, useState } from "react"
import { LoadingScreen } from "../components/loading"
import { Navbar } from "../components/navbar"
import { Link, useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { Modal } from "../components/Modal";

import {
    MdBuild,
    MdDirectionsCar,        // Chave de fenda/ferramentas para "Outros"
    MdOpacity,       // Floco de neve para Ar Condicionado
    MdFlashOn,  // Rolo de pintura para Funilaria
    MdAcUnit,      // Gota para Troca de Óleo
    MdFormatPaint,      // Raio para Elétrica
    MdSettings
} from 'react-icons/md'
import { api } from "../../service/api";
import { ca } from "date-fns/locale";
import { UserContext } from "../../context/UserLogin";

export default function ServiceAdd() {

    const location = useLocation()
    const { editserv, editdesc, editicon, editstatus } = location.state || {}
    const { id_service } = useParams()
    const navigate = useNavigate()
    const [serviceapi, setserviceapi] = useState('')
    const [clientsapi, setclientsapi] = useState([])
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [mecanicosapi, setmecanicosapi] = useState([])
    const [service, setservice] = useState('')
    const [description, setdescription] = useState('')
    const [icone, seticone] = useState('')
    const [statusservico, setstatusservico] = useState('')
    const [loading, setloading] = useState(false);
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const { token } = useContext(UserContext)
    const LISTA_ICONES = [
        { id: 'engine-outline', iconeWeb: <MdBuild size={30} />, label: 'Injeção' },
        { id: 'car-break-abs', iconeWeb: <MdDirectionsCar size={30} />, label: 'Freios' },
        { id: 'oil', iconeWeb: <MdOpacity size={30} />, label: 'Óleo' },
        { id: 'lightning-bolt-outline', iconeWeb: <MdFlashOn size={30} />, label: 'Eletrica' },
        { id: 'snowflake', iconeWeb: <MdAcUnit size={30} />, label: 'Ar Cond.' },
        { id: 'format-paint', iconeWeb: <MdFormatPaint size={30} />, label: 'Pintura' },
        { id: 'wrench', iconeWeb: <MdSettings size={30} />, label: 'Outros' },
    ]
    useEffect(() => {
        if (id_service > 0) {
            if (editserv) setservice(editserv);
            if (editdesc) setdescription(editdesc);
            if (editicon) seticone(editicon);
            if (editstatus) setstatusservico(editstatus);
        }
    }, [id_service, editdesc, editicon])
    function ReturnHome(e) {
        CleanScreen()
        navigation.navigate('/services')
    }
    function CleanScreen() {
        setservice('')
        setdescription('')
        seticone('')
        setactivenotification(!activenotification)
    }
    async function Edit() {
        setloading(true)
        try {
            await awaiting(2500)
            api.defaults.headers.Authorization = `Bearer ${token}`
            const res = await api.put(`/servicessearch/${id_service}`, {
                service: service,
                description: description,
                icone_id: icone,
                status: statusservico
            })
            console.log(res.data)
            setmsgnotification(res.data.message)
            setactivenotification(true)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    async function CreateService() {
        setloading(true)
        try {
            await awaiting(2500)
            api.defaults.headers.Authorization = `Bearer ${token}`
            const res = await api.post('/servicessearch', {
                service: service,
                description: description,
                icone_id: icone
            })
            setmsgnotification(res.data.message)
            setactivenotification(true)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    const handleNomeChange = (texto) => {
        let formatado = texto.trimStart();
        if (formatado.length > 4) {
            formatado = formatado.charAt(0).toUpperCase() + formatado.slice(1)
        }
        setservice(formatado)
    }

    const isFormInvalid = service.trim().length >= 8 && description.trim().length >= 15 && icone !== ''
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
                                {id_service > 0 ? 'Editar Servico' : 'Adicionar Servico'}</h2>
                        </div>
                        <form>
                            {
                                activenotification ?
                                    <Modal
                                        titulo={msgnotification}
                                        description={msgnotification}
                                        onclick={(e) => CleanScreen}
                                        returnhome={(e) => ReturnHome(e)}></Modal>
                                    : ''
                            }
                            {
                                id_service > 0 ?
                                    <div className="md-3">
                                        <label htmlFor="client" className="form-label">Servico</label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={service}
                                            id='nome'
                                            placeholder="Alterar nome do servico..."
                                            onChange={(i) => handleNomeChange(i.target.value)}

                                        >
                                        </input>
                                    </div>
                                    :
                                    <div>
                                        <label htmlFor="client" className="form-label">Servico</label>
                                        <div className="form-control mb-2">
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                id='nome'
                                                placeholder="Ex: Troca de Oleo, Injeção Eletronica..."
                                                value={service}
                                                onChange={(i) => handleNomeChange(i.target.value)}
                                            />
                                            {service.length > 0 && service.length < 8 && (
                                                <div className="form-text text-danger">O nome deve ter pelo menos 8 carcteres </div>
                                            )}
                                        </div>
                                    </div>
                            }
                            <label htmlFor="mecanico" className="form-label">Descricao </label>
                            {
                                id_service > 0 ?
                                    <div className="form-control mb-3">
                                        <textarea
                                            disabled={service.length < 8 ? true : false}
                                            className="form-control"
                                            value={description}
                                            id='descricao'
                                            rows='3'
                                            placeholder="Altere a descrição do servico"
                                            onChange={(e) => setdescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    :
                                    <div className="form-control mb-3">
                                        <textarea
                                            disabled={service.length < 8 ? true : false}
                                            className="form-control"
                                            id='descricao'
                                            rows='3'
                                            placeholder="Ex: Verificação completa e substituição do fluido lubrificante..."
                                            onChange={(e) => setdescription(e.target.value)}
                                        ></textarea>
                                    </div>
                            }

                            <div className="mb-4">
                                <label htmlFor="icone" className="form-label fw semibold">Icone do Aplicativo Mobile</label>
                                <div
                                    className="d-flex overflow-x-auto pb-2 gap-3"
                                    style={{ scrollbarWidth: 'thin' }}
                                >
                                    {LISTA_ICONES.map((item) => {
                                        const isSelected = icone === item.id
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                disabled={description.trim().length < 16 ? true : false}
                                                onClick={() => seticone(item.id)}
                                                className={`d-flex flex-column align-items-center justify-content-center p3 rounded-3 border transition-all`}
                                                style={{
                                                    minWidth: '90px',
                                                    height: '90px',
                                                    cursor: 'pointer',
                                                    backgroundColor: isSelected ? '#EBF8FF' : '#F8FAFC',
                                                    borderColor: isSelected ? '#002f6C' : '#E2E8F0',
                                                    color: isSelected ? '#002f6c' : '#64748b',
                                                    boxShadow: isSelected ? '0 0 0 2px #002F6C' : 'none',
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                <div className="mb-2">{item.iconeWeb}</div>
                                                <span style={{ fontSize: '11px', fontWeight: '600' }}>{item.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </form>
                        {id_service > 0 && (
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Status de Visibilidade</label>

                                <div className="d-flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setstatusservico('A')}
                                        className="btn d-flex align-items-center justify-content-center gap-2 flex-fill py-2.5 rounded-3 border fw-semibold transition-all"
                                        style={{
                                            backgroundColor: statusservico == 'A' ? '#EBF8FF' : '#FFFFFF',
                                            borderColor: statusservico == 'A' ? '#2563EB' : '#E2E8F0',
                                            color: statusservico === 'A' ? '#2562eb' : '#64748B',
                                            boxShadow: statusservico === 'A' ? '0 0 0 1px #2563eb' : 'none',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <span style={{ filter: statusservico === 'A' ? "none" : "grayscale(100%)" }}>🟢</span>
                                        Ativo (Disponivel no App)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setstatusservico('I')}
                                        className="btn d-flex align-items-center justify-content-center gap-2 flex-fill py-2.5 rounded-3 border fw-semibold transition-all"
                                        style={{
                                            backgroundColor: statusservico == 'I' ? '#FEF2F2' : '#FFFFFF',
                                            borderColor: statusservico == 'I' ? '#DC2626' : '#E2E8F0',
                                            color: statusservico === 'I' ? '#DC2626' : '#64748B',
                                            boxShadow: statusservico === 'I' ? '0 0 0 1px #DC2626' : 'none',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <span style={{ filter: statusservico === 'A' ? "none" : "grayscale(100%)" }}>🔴</span>
                                        Inativo(Indisponivel no App)
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="col-12 mt-3">
                            <div className="d-flex justify-content-end">
                                <Link to='/services' className='btn btn-outline-primary me-3'>
                                    Cancelar
                                </Link>
                                <button
                                    className={isFormInvalid ? "btn btn-primary" : 'btn btn-secondary'}
                                    disabled={!isFormInvalid ? true : false}
                                    onClick={id_service > 0 ? Edit : CreateService}
                                >{id_service > 0 ? 'Editar Dados' : 'Adicionar'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}