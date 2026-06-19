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
import { ar, ca } from "date-fns/locale";
import { UserContext } from "../../context/UserLogin";
import { ContextMecanicos } from "../../context/Mecanicos";
export default function MecanicosAdd() {
    const location = useLocation()
    const navigate = useNavigate()
    const {id_mecanico} = useParams()
    const { nmecanic, mcpf, memail, mgenero,mtelefone,mtituloprofissional, mexperiencia,mdescricao } = location.state || {}
    const [carregando, setcarregando] = useState(false)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const { token } = useContext(UserContext)
    const {
        iditmecanicoid,setiditmecanicoid,
        imagepreview,setimagepreview,
        arquivoImagem,setarquivoImagem,
        nome,setnome,
        cpf,setcpf,
        genero,setgenero,
        generoselecionado,setgeneroselecionado,
        email,setemail,
        telefone,settelefone,
        serviceapi,
        servicoselecionado,setservicoselecionado,
        tituloprofissional,settituloprofissional,
        tituloprofissionalselecionado,settituloprofissionalselecionado,
        experiencia,setexperiencia,
        experienciaselecionada,setexperienciaselecionada,
        description,setdescription,
        statusservico,setstatusservico,
        activenotification,setactivenotification,
        msgnotification,setmsgnotification,
        steps,setsteps,
        SearchMecanicos, 
        CreateMecanico,
        LoadServices,
        Edit,
        ReturnHome,
        CleanScreen,
        loading,setloading} = useContext(ContextMecanicos)
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
    const handleCheckboxChangeExperience = (id) => {
        if (experienciaselecionada.includes(id)) {
            setexperienciaselecionada(experienciaselecionada.filter(item => item !== id))
        } else {
            setexperienciaselecionada([...experienciaselecionada, id])
        }
    }
    const handleAlterarImage = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            setarquivoImagem(arquivo);
            setimagepreview(URL.createObjectURL(arquivo))
        }
    }
    useEffect(() => {
        if (id_mecanico > 0) {
            if(id_mecanico) setiditmecanicoid(id_mecanico)
            if (nmecanic) setnome(nmecanic);
            if (mcpf) setcpf(mcpf);
            if (memail) setemail(memail);
            if (mgenero) setgeneroselecionado(mgenero);
            if (mtelefone) settelefone(mtelefone);
            if (mexperiencia) setexperienciaselecionada(parseInt(mexperiencia));
            if (mtituloprofissional) settituloprofissionalselecionado(parseInt(mtituloprofissional));
            if (mdescricao) setdescription(mdescricao)
        }
    }, [id_mecanico, mcpf, memail,mgenero,mtelefone,mexperiencia,mtituloprofissional])
    useEffect(() => {
        setgenero([
            { id_genero: 1, label: 'Masculino', icon: '👨' },
            { id_genero: 2, label: 'Feminino', icon: '👩' },
            { id_genero: 3, label: 'Outro/Nao Informar', icon: '👤' }
        ])
        settituloprofissional([
            { id_profissional: 1, label: 'Mecanico Especializado' },
            { id_profissional: 2, label: 'Mecanico Geral' }
        ])
        setexperiencia([
            { id_experience: 1, label: '1° Ano' },
            { id_experience: 2, label: '2° Anos' },
            { id_experience: 3, label: '3° Anos' },
            { id_experience: 4, label: '4° Anos' },
            { id_experience: 5, label: '5° Anos' }
        ])
        LoadServices()
    }, [nome])

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
    const isStep1Valid = nome.length >= 8 && generoselecionado !== '' && cpf.length >= 11 && telefone.length > 8 && email.includes('@');
    const isStep2Valid = servicoselecionado.length > 0 && tituloprofissionalselecionado != '' && experienciaselecionada != '' && description !='';
    const isFormInvalid = true// nome.length >= 8  && cpf.length >0 && experienciaselecionada.length >0 && telefone.length >8
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
                                {id_mecanico > 0 ? 'Editar dados' : 'Adicionar Mecanico'}</h2>
                            <span className="badge rounded-pill bg-light text-primary border px-3 fw-semibold">
                                Etapa {steps} de 2
                            </span>
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
                            {steps == 1 && (
                                <div className="animated__animated animate__fadeIn">
                                    <div className="d-flex flex-column align-items-center mb-4" >
                                        <div
                                            className="overflow-hidden bg-light border rounded-circle mb-2 d-flex align-items-center justify-content-center"
                                            style={{ width: `100px`, height: '100px' }}
                                        >
                                            {imagepreview ? (
                                                <img src={imagepreview} alt="Preview" className="w-100 h-100 object-fit-cover"></img>
                                            ) : (
                                                <span className="text-secondary small">Sem foto</span>
                                            )}
                                        </div>
                                        <label className="btn btn-outline-primary btn-sm position-relative">
                                            Selecionar Foto
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAlterarImage}
                                                className="position-absolute top-0 start-0 opacity-0 w-100 h-100"
                                                style={{ cursor: 'pointer' }}></input>
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">NOME COMPLETO </label>
                                        <input
                                            type="text"
                                            className="form-control px-3 py-2 rounded-3"
                                            placeholder="Julio Miguel..."
                                            value={nome}
                                            onChange={(e) => handleNomeChange(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Genero</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle d-flex flex-wrap">
                                            {genero.map(item => {
                                                const isSelect = generoselecionado == item.id_genero
                                                return (
                                                    <button
                                                        key={item.id_genero}
                                                        type="button"
                                                        onClick={() => setgeneroselecionado(item.id_genero)}
                                                        className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 border"
                                                        style={{
                                                            backgroundColor: isSelect ? '#EBF8FF' : '#FFFFFF',
                                                            borderColor: isSelect ? '#2563eb' : '#475569',
                                                            color: isSelect ? '#2563eb' : '#475569',
                                                            transition: 'all 0.2s ease-in-out'
                                                        }}>
                                                        <span>{item.icon}</span>
                                                        {item.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
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
                                            onChange={(e) => {
                                                const emailtratado = e.target.value.toLowerCase().trim();
                                                setemail(emailtratado)
                                            }}
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">TELEFONE</label>
                                        <input
                                            type="text"
                                            className="form-control px-3 py-2 rounded-3"
                                            placeholder="(98) 998721-2813"
                                            value={telefone}
                                            onChange={(e) => settelefone(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                            )}

                            {steps == 2 && (
                                <div className="animate__animated animate__fadeIn">
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
                                                        {item.service}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Titulo Profissional</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                            style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                            {tituloprofissional.map(item => {
                                                const isChecked = tituloprofissionalselecionado === item.id_profissional
                                                return (
                                                    <button
                                                        key={item.id_profissional}
                                                        type='button'
                                                        onClick={() => settituloprofissionalselecionado(item.id_profissional)}
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
                                                                fontSize: '12px',
                                                                opacity: isChecked ? 1 : 0.4,
                                                                filter: isChecked ? 'none' : 'grayscale(100%)'
                                                            }}>
                                                            {isChecked ? '🔵' : '⚪'}
                                                        </span>
                                                        {item.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-secondary small text-uppercase">Tempo Experiencia</label>
                                        <div className="p-3 bg-light rounded-3 border border-light-subtle"
                                            style={{ maxHeight: '180px', overflowY: "auto", scrollbarWidth: 'thin' }}>
                                            {experiencia.map(item => {
                                                const isChecked = experienciaselecionada === item.id_experience
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
                                    <label className="form-label fw-semibold text-secondary small text-uppercase">Habilidades</label>
                                    <div className="form-control mb-3">
                                        <textarea
                                            className="form-control"
                                            id='descricao'
                                            value={description}
                                            rows='3'
                                            placeholder="Mais de 10 anos de experiencia em oficina, minha habilidades foram muito aperfeçoadas com...."
                                            onChange={(e) => setdescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                            )}

                        </form>
                        {id_mecanico > 0 && (
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

                        <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                            {
                                steps === 1 ? (
                                    <Link to='/mecanicos' className='btn btn-outline-primary me-3'>
                                        Cancelar
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => setsteps(1)}>
                                        Voltar
                                    </button>
                                )
                            }
                            {
                                steps === 1 ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary px-4"
                                        disabled={!isStep1Valid}
                                        onClick={() => setsteps(2)}>
                                        Avancar
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className='btn btn-primary px-4'
                                        disabled={!isStep2Valid}
                                        onClick={id_mecanico > 0 ? ()=> Edit() : () => CreateMecanico()}
                                    >
                                        {id_mecanico>0?'Atualizar':'Cadastrar'}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}