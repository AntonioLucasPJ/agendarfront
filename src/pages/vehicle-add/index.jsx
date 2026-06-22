import { use, useContext, useEffect, useState } from "react"
import { LoadingScreen } from "../components/loading"
import { Navbar } from "../components/navbar"
import { Link, replace, useLocation, useNavigate, useParams, useRoutes } from "react-router";
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
import { ar, ca, da } from "date-fns/locale";
import { UserContext } from "../../context/UserLogin";
import { ContextMecanicos } from "../../context/Mecanicos";
import { AlertMessage } from "../components/Alert";
export default function VehicleAdd() {
    const [loading, setloading] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const [activenotification, setactivenotification] = useState(false)
    const [alert, setalert] = useState(false)
    const [msgalert, setmsgalert] = useState('')
    const [icone, seticone] = useState([])
    const [imagepreview, setimagepreview] = useState('')
    const [arquivoImagem, setarquivoImagem] = useState(null)
    const [listbrand, setlistbrand] = useState([])
    const [brand, setbrand] = useState('')
    const [brandselecionado, setbrandselecionado] = useState([])
    const [model, setmodel] = useState('')
    const [ano, setano] = useState('')

    const [statusservico, setstatusservico] = useState('')
    const [btdisable, setbtdisable] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const { id_vehicle } = useParams()
    const { editbrand, editmodel, edityear, editstatus } = location.state || ''
    const { nmecanic, mcpf, memail, mgenero, mtelefone, mtituloprofissional, mexperiencia, mdescricao } = location.state || {}
    const [carregando, setcarregando] = useState(false)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const { token } = useContext(UserContext)
    useEffect(() => {
        async function LoadBrands() {
            const res = await api.get('/vehicle/brands')
            setlistbrand(res.data)
        }
        LoadBrands()
    }, [])
    const handleAlterarImage = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            setarquivoImagem(arquivo);
            setimagepreview(URL.createObjectURL(arquivo))
        }
    }
    useEffect(() => {
        if (id_vehicle > 0) {

            if (editbrand) setbrand(editbrand)
            if (editmodel) setmodel(String(editmodel));
            if (edityear) setano(String(edityear));
            if (editstatus) setstatusservico(editstatus)

        }
    }, [id_vehicle, editbrand, editmodel, edityear])
    async function CreateVehicle() {
        let urlfinalimage = imagepreview
        const CLOUD_NAME = 'dniwjfgal'
        const UPLOAD_PRESENT = 'agendarweb'
        setloading(true)
        try {
            if (arquivoImagem) {
                const formData = new FormData();
                formData.append('file', arquivoImagem);
                formData.append('upload_preset', UPLOAD_PRESENT);
                const respostaCloudinary = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: formData }
                )
                const dadosimagem = await respostaCloudinary.json();
                if (dadosimagem.secure_url) {
                    urlfinalimage = dadosimagem.secure_url;
                } else {
                    throw new Error('Falha ao obter URL do Cloudinary')
                }
                const dadosapi = {
                    brand: brand,
                    model: model,
                    image: urlfinalimage,
                    ano: ano
                }
                await awaiting(2500)
                api.defaults.headers.Authorization = `Bearer ${token}`
                const res = await api.post('/vehicle/modelvehicle', dadosapi)
                setmsgnotification(res.data.message)
                setactivenotification(true)
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            setmsgalert(error.response?.data?.error || error.message || 'Error desconhecido')
            setalert(true)
        }

    }
    async function EditVehicle() {
        setloading(true)
        try {
            const dadosapi = {
                model: model,
                year: ano,
                status: statusservico
            }
            console.log(dadosapi)
            await awaiting(2500)
            api.defaults.headers.Authorization = `Bearer ${token}`
            const res = await api.put(`/vehicle/${id_vehicle}`, dadosapi)
            setmsgnotification(res.data.message)
            setactivenotification(true)
            setloading(false)
        } catch (error) {
            setloading(false)
            setalert(true)
            setmsgalert(error.response.data.error)

        }
    }

    const FormatAno = (value) => {
        const string = String(value || '')
        return string
            .replace(/\D/g, '')
            .substring(0, 4)
    }
    const HandleAno = (e) => {
        const valorformatado = FormatAno(e.target.value)
        setano(valorformatado)
    }
    const validaremail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)

    }
    async function Home() {
        setactivenotification(false)
        navigate('/mecanicos', { replace: true })
    }
    async function ReturnHome() {
        navigate('/vehicles')
    }
    function CleanScreen() {
        setactivenotification(false)
        ReturnHome()
    }
    return (
        <>
            <Navbar></Navbar>
            <main className="container mt-5 pt-5 pb-5">
                {loading && (
                    <LoadingScreen></LoadingScreen>
                )}

                <div className="row justify-content-center">
                    {alert && (
                        <AlertMessage msg={msgalert}></AlertMessage>
                    )}
                    <div className="col-10 col-md-10 col-lg-5 bg-white p-4 rounded-4 shadow-sm border">
                        <div className="text-center mb-3">
                            <h2 className="text-primary user-select-none fw-bold">
                                {id_vehicle > 0 ? 'Editar dados' : 'Adicionar Veiculo'}</h2>
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
                                <div className="mb-4">
                                    <label htmlFor="icone" className="form-label fw semibold">Marca/Fabricante</label>
                                    <div
                                        className="d-flex overflow-x-auto pb-2 gap-3"
                                        style={{ scrollbarWidth: 'thin' }}
                                    >
                                        {listbrand.map((item) => {
                                            const isSelected = brand === item.id

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    disabled={id_vehicle > 0 ? true : false}
                                                    onClick={() => setbrand(item.id)}
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
                                                    <img style={{ width: `50px` }} src={item.imagem_url}></img>
                                                    <span style={{ fontSize: '11px', fontWeight: '600', gap: '20px' }}>{item.name}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-secondary small text-uppercase">MODELO </label>
                                    <input
                                        type="text"
                                        className="form-control px-3 py-2 rounded-3"
                                        placeholder="Onix 1.0 Plus Turbo..."
                                        value={model}
                                        onChange={(e) => setmodel(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-secondary small text-uppercase">ANO</label>
                                    <input
                                        type="text"
                                        className="form-control px-3 py-2 rounded-3"
                                        placeholder="2022"
                                        value={ano}
                                        onChange={(e) => {
                                            const anoformatados = FormatAno(e.target.value)
                                            setano(anoformatados)
                                            const isValid = String(model).trim().length >= 8 && anoformatados.length === 4
                                            setbtdisable(!isValid)
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </form>
                        {id_vehicle > 0 && (
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
                            <Link to='/vehicles' className='btn btn-outline-primary me-3'>
                                Cancelar
                            </Link>
                            <button
                                type="button"
                                className='btn btn-primary px-4'
                                disabled={btdisable}
                                onClick={id_vehicle > 0 ? () => EditVehicle() : () => CreateVehicle()}
                            >
                                {id_vehicle > 0 ? 'Atualizar' : 'Cadastrar'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}