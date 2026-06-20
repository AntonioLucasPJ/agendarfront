import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserLogin";
import { api } from "../service/api";
import { replace, useNavigate, useParams, useRoutes } from "react-router";

export const ContextMecanicos = createContext()
export const MecanicosProvider = ({ children }) => {
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [mecanicos, setmecanicos] = useState([])
    //Edit
    const [iditmecanicoid, setiditmecanicoid] = useState('')
    //Step 1
    const [imagepreview, setimagepreview] = useState('')
    const [arquivoImagem, setarquivoImagem] = useState(null)
    const [nome, setnome] = useState('')
    const [genero, setgenero] = useState([])
    const [generoselecionado, setgeneroselecionado] = useState('')
    const [cpf, setcpf] = useState('')
    const [telefone, settelefone] = useState('')
    const [email, setemail] = useState('')

    //Step 2
    const [serviceapi, setserviceapi] = useState([])
    const [servicoselecionado, setservicoselecionado] = useState('')
    const [tituloprofissional, settituloprofissional] = useState([])
    const [tituloprofissionalselecionado, settituloprofissionalselecionado] = useState('')
    const [experiencia, setexperiencia] = useState([])
    const [experienciaselecionada, setexperienciaselecionada] = useState('')
    const [loading, setloading] = useState(false)
    const [description, setdescription] = useState('')
    const [statusservico, setstatusservico] = useState('')

    //Notification
    const [activenotification, setactivenotification] = useState(false)
    const [msgnotification, setmsgnotification] = useState('')
    const { token } = useContext(UserContext)
    const tokenreal = token || localStorage.getItem("token")

    //Page
    const [steps, setsteps] = useState(1)

    async function SearchMecanicos() {
        const res = await api('/mecanicos')
        api.defaults.headers.Authorization = `Bearer ${tokenreal}`
        setmecanicos(res.data)
    }
    async function CreateMecanico() {
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
                let servicostratados = JSON.stringify(servicoselecionado)

                const dadosapi = {
                    name: nome,
                    services: servicostratados,
                    genero: generoselecionado,
                    titulo_profissional: tituloprofissionalselecionado,
                    avatar_url: urlfinalimage,
                    experiencia: experienciaselecionada,
                    telefone: telefone,
                    email: email,
                    descricao: description,
                    cpf: cpf
                }
                await awaiting(2500)
                api.defaults.headers.Authorization = `Bearer ${token}`
                const res = await api.post('/mecanicos', dadosapi)
                setmsgnotification(res.data.message)
                setactivenotification(true)
                setloading(false)
                CleanScreen()
            }

        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    async function Edit() {
        setloading(true)
        let urlfinalimage = imagepreview
        const CLOUD_NAME = 'dniwjfgal'
        const UPLOAD_PRESENT = 'agendarweb'
        try {
            await awaiting(2500)
            api.defaults.headers.Authorization = `Bearer ${token}`
            let servicostratados = JSON.stringify(servicoselecionado)
            const res = await api.put(`/mecanicos/${iditmecanicoid}`, {
                name: nome,
                services: servicostratados,
                genero: generoselecionado,
                titulo_profissional: tituloprofissionalselecionado,
                avatar_url: urlfinalimage,
                mexperiencia: experienciaselecionada,
                telefone: telefone,
                email: email,
                mdescricao: description,
                cpf: cpf,
                ativo: statusservico
            })
            setmsgnotification(res.data.message)
            setactivenotification(true)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    async function LoadServices() {
        const res = await api.get('/servicessearch?ativo=A')
        setserviceapi(res.data)
    }
    function CleanScreen() {
        setnome('')
        setcpf('')
        setgeneroselecionado('')
        setemail('')
        settelefone('')
        setdescription('')
    }
    return (
        <ContextMecanicos.Provider value={{ iditmecanicoid, setiditmecanicoid, arquivoImagem, setarquivoImagem, imagepreview, setimagepreview, mecanicos, nome, setnome, genero, setgenero, generoselecionado, setgeneroselecionado, cpf, setcpf, email, setemail, telefone, settelefone, serviceapi, setservicoselecionado, servicoselecionado, tituloprofissional, settituloprofissional, tituloprofissionalselecionado, settituloprofissionalselecionado, experiencia, setexperiencia, experienciaselecionada, setexperienciaselecionada, description, setdescription, statusservico, setstatusservico, activenotification, setactivenotification, msgnotification, setmsgnotification, loading, setloading, SearchMecanicos, setsteps, steps, CreateMecanico, Edit, LoadServices, CleanScreen }}>{children}</ContextMecanicos.Provider>
    )
}