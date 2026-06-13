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
import { IMaskInput } from 'react-imask'
export default function MecanicosAdd() {

    const location = useLocation()
    const { editserv, editdesc, editicon, editstatus } = location.state || {}
    const { id_service } = useParams()
    const navigate = useNavigate()
    const [serviceapi, setserviceapi] = useState([])
    const [tituloprofissional, settituloprofissional] = useState([])
    const [tituloprofissionalselecionado, settituloprofissionalselecionado] = useState('')
    const [experiencia, setexperiencia] = useState([])
    const [experienciaselecionada, setexperienciaselecionada] = useState('')
    const [clientsapi, setclientsapi] = useState([])
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [mecanicosapi, setmecanicosapi] = useState([])
    const [nome, setnome] = useState('')
    const [cpf, setcpf] = useState('')
    const [telefone, settelefone] = useState('')
    const [email, setemail] = useState('')
    const [description, setdescription] = useState('')
    const [servicoselecionado, setservicoselecionado] = useState('')
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
    const nameIsvalid = nome.length > 8
    const handleCheckboxChange = (id) => {
        if (servicoselecionado.includes(id)) {
            setservicoselecionado(servicoselecionado.filter(item => item !== id))
        } else {
            setservicoselecionado([...servicoselecionado, id])
        }
    }
    const handleCheckboxChangeTitulo = (id) => {
        if (tituloprofissionalselecionado.includes(id)) {
            settituloprofissionalselecionado(tituloprofissionalselecionado.filter(item => item !== id))
        } else {
            settituloprofissionalselecionado([...tituloprofissionalselecionado, id])
        }
    }
    const handleCheckboxChangeExperience = (id) => {
        if (experienciaselecionada.includes(id)) {
            setexperienciaselecionada(experienciaselecionada.filter(item => item !== id))
        } else {
            setexperienciaselecionada([...experienciaselecionada, id])
        }
    }
    useEffect(() => {
        if (id_service > 0) {
            if (editserv) setservice(editserv);
            if (editdesc) setdescription(editdesc);
            if (editicon) seticone(editicon);
            if (editstatus) setstatusservico(editstatus);
        }
    }, [id_service, editdesc, editicon])
    useEffect(() => {
        if (nome) {
            setserviceapi([
                { id_service: 1, label: 'Troca de Óleo' },
                { id_service: 2, label: 'Freios & Suspensão' },
                { id_service: 3, label: 'Injeção Eletrônica' },
                { id_service: 4, label: 'Elétrica' }
            ]);
            settituloprofissional([
                { id_profissional: 1, label: 'Mecanico Especializado' },
                { id_profissional: 2, label: 'Mecanico Geral' }
            ])
            setexperiencia([
                { id_experience: 1, label: '1° Ano' },
                { id_experience: 2, label: '2° Ano' },
                { id_experience: 2, label: '3° Ano' },
                { id_experience: 2, label: '4° Ano' },
                { id_experience: 2, label: '5° Ano' }
            ])

        }
    }, [nome])

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
        setnome(formatado)
    }
    const validaremail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }
    const isFormInvalid = name.trim().length >= 8 && description.trim().length >= 15 && icone !== ''
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
                                {id_service > 0 ? 'Editar Servico' : 'Adicionar Mecanico'}</h2>
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
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Nome Completo</label>
                                <input
                                    type="text"
                                    className="form-control px-3 py-2 rounded-3"
                                    placeholder="Digite o nome completo"
                                    value={nome}
                                    onChange={(e) => handleNomeChange(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">CPF</label>
                                <input
                                    type="text"
                                    className="form-control px-3 py-2 rounded-3"
                                    placeholder="121.454.342-92"
                                    value={cpf}
                                    onChange={(e) => setcpf(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">E-MAIL</label>
                                <input
                                    type="text"
                                    className="form-control px-3 py-2 rounded-3"
                                    placeholder="mecanicajb@gmail.com"
                                    value={email}
                                    onChange={(e) => validaremail(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">TELEFONE</label>
                                <input
                                    type="text"
                                    className="form-control px-3 py-2 rounded-3"
                                    placeholder="(98) 998721-2813"
                                    value={telefone}
                                    onChange={(e) => handleNomeChange(e.target.value)}
                                ></input>
                            </div>
                            {
                                id_service > 0 ?
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Servicos</label>
                                        {/* <div className="p-3 bg-light rounded-3 border border-light-subtle" style={{ maxWidth: '150px', overflowY: "auto" }}>

                                            {serviceapi.map(item => (
                                                <div key={item.id_service} className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item.id_service}
                                                        checked={servicoselecionado.includes(item.id)}
                                                        onChange={() => ''}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <label className="form-check-label small fw-medium text-dark">
                                                            teste
                                                        </label>
                                                    </input>
                                                </div>
                                            ))}
                                        </div> */}
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Servicos</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                            style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                            {serviceapi.map(item => {
                                                const isChecked = servicoselecionado.includes(item.id_service)
                                                return (
                                                    <button
                                                        key={item.id_service}
                                                        type='button'
                                                        onClick={() => handleCheckboxChange(item.id_service)}
                                                        className="d-inline align-items-center gap-7 px-3 py-2 rounded-3 border fw-medium transition-all"
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '13px',
                                                            backgroundColor: isChecked ? '#EBF8FF' : '#FFFFFF',
                                                            borderColor: isChecked ? '#2664eB' : '#475569',
                                                            color: isChecked ? '#2563eb' : '#475569',
                                                            boxShadow: isChecked ? '0 0 0 1px #2563eb' : 'none',
                                                            transition: 'all 0.15s ease',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '11px',
                                                                opacity: isChecked ? 1 : 0.4,
                                                                filter: isChecked ? 'none' : 'grayscale(100%)'
                                                            }}>
                                                            {isChecked ? '🔹' : '▫️'}
                                                        </span>
                                                        {item.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                            }
                            {
                                id_service > 0 ?
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Servicos</label>
                                        {/* <div className="p-3 bg-light rounded-3 border border-light-subtle" style={{ maxWidth: '150px', overflowY: "auto" }}>

                                            {serviceapi.map(item => (
                                                <div key={item.id_service} className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item.id_service}
                                                        checked={servicoselecionado.includes(item.id)}
                                                        onChange={() => ''}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <label className="form-check-label small fw-medium text-dark">
                                                            teste
                                                        </label>
                                                    </input>
                                                </div>
                                            ))}
                                        </div> */}
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Titulo Profissional</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                            style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                            {tituloprofissional.map(item => {
                                                const isChecked = tituloprofissionalselecionado.includes(item.id_profissional)
                                                return (
                                                    <button
                                                        key={item.id_profissional}
                                                        type='button'
                                                        onClick={() => handleCheckboxChangeTitulo(item.id_profissional)}
                                                        className="d-inline align-items-center gap-7 px-3 py-2 rounded-3 border fw-medium transition-all"
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '13px',
                                                            backgroundColor: isChecked ? '#EBF8FF' : '#FFFFFF',
                                                            borderColor: isChecked ? '#2664eB' : '#475569',
                                                            color: isChecked ? '#2563eb' : '#475569',
                                                            boxShadow: isChecked ? '0 0 0 1px #2563eb' : 'none',
                                                            transition: 'all 0.15s ease',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '11px',
                                                                opacity: isChecked ? 1 : 0.4,
                                                                filter: isChecked ? 'none' : 'grayscale(100%)'
                                                            }}>
                                                            {isChecked ? '🔹' : '▫️'}
                                                        </span>
                                                        {item.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                            }
                            {
                                id_service > 0 ?
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Servicos</label>
                                        {/* <div className="p-3 bg-light rounded-3 border border-light-subtle" style={{ maxWidth: '150px', overflowY: "auto" }}>

                                            {serviceapi.map(item => (
                                                <div key={item.id_service} className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item.id_service}
                                                        checked={servicoselecionado.includes(item.id)}
                                                        onChange={() => ''}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <label className="form-check-label small fw-medium text-dark">
                                                            teste
                                                        </label>
                                                    </input>
                                                </div>
                                            ))}
                                        </div> */}
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Experiencia</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                            style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                            {experiencia.map(item => {
                                                const isChecked = experiencia.includes(item.id_experience)
                                                return (
                                                    <button
                                                        key={item.id_experience}
                                                        type='button'
                                                        onClick={() => setexperienciaselecionada(item.id_experience)}
                                                        className="d-inline align-items-center gap-7 px-3 py-2 rounded-3 border fw-medium transition-all"
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '13px',
                                                            backgroundColor: isChecked ? '#EBF8FF' : '#FFFFFF',
                                                            borderColor: isChecked ? '#2664eB' : '#475569',
                                                            color: isChecked ? '#2563eb' : '#475569',
                                                            boxShadow: isChecked ? '0 0 0 1px #2563eb' : 'none',
                                                            transition: 'all 0.15s ease',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '11px',
                                                                opacity: isChecked ? 1 : 0.4,
                                                                filter: isChecked ? 'none' : 'grayscale(100%)'
                                                            }}>
                                                            {isChecked ? '🔹' : '▫️'}
                                                        </span>
                                                        {item.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                            }
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