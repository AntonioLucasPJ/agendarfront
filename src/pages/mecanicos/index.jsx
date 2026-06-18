import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { use, useContext, useEffect, useState } from "react";
import { ContextMecanicos } from "../../context/Mecanicos";
import { Mecanicos } from "../components/mecanicos";
import { ModalDelete } from "../components/Modal/index.jsx"
import { LoadingScreen } from "../components/loading";
import { api } from "../../service/api.js";

export default function PageMecanicos() {
    const { mecanicos, SearchMecanicos } = useContext(ContextMecanicos)
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [laoding, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const carregardados = async () => {
            setloading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))
                SearchMecanicos()
            } catch (error) {
                console.log('Erro de processamento de tela')
            } finally {
                setloading(false)
            }
        }
        carregardados()
    }, [])
    function EditLoad(id_mecanico, name, genero, cpf, email,telefone,titulo_prossional,experiencia,descricao, client) {
        navigate('/mecanicos/add/' + id_mecanico, {
            state: {
                nmecanic: name,
                mgenero: genero,
                mcpf: cpf,
                memail: email,
                mtelefone: telefone,
                mtituloprofissional:titulo_prossional,
                mexperiencia:experiencia,
                mdescricao:descricao
            }
        })
    }
    async function DeleteService() {
        setloading(true)
        try {
            await awaiting(2500)
            const res = await api.delete(`/mecanicos/delete/${iddelete}`)
            setalertdelete(false)
            setloading(false)
            window.location.reload()
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setalertdelete(false)
            setloading(false)
        }
    }
    async function DeletLoad(id_service) {
        setalertdelete(true)
        setiddelete(id_service)
    }
    return (
        <div className="container-fluid mt-page">
            {laoding && (
                <LoadingScreen></LoadingScreen>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja deletar esse servico?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => DeleteService()}
                ></ModalDelete>
            )}
            <Navbar></Navbar>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Mecanicos</h2>
                    <Link
                        to='/mecanicos/add'
                        className="btn btn-outline-primary ms-5 mb-2"
                    >Adicionar mecanico
                    </Link>
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Servicos</th>
                            <th scope="col">Situação</th>
                        </tr>
                    </thead>
                    {mecanicos && (
                        <tbody>
                            {mecanicos.map(item => {
                                return (
                                    <Mecanicos
                                        key={item.id_mecanico}
                                        id_mecanico={item.id_mecanico}
                                        name={item.name}
                                        services={item.services}
                                        ativo={item.ativo}
                                        cpf = {item.cpf}
                                        email = {item.email}
                                        telefone = {item.telefone}
                                        genero =  {item.genero}
                                        descricao = {item.descricao}
                                        titulo_profissional = {item.titulo_profissional}
                                        experiencia = {item.experiencia}
                                        clickdelete={(id) => DeletLoad(id)}
                                        clickedit ={(id,name,genero,cpf,email,telefone,titulo_prossional,experiencia,descricao)=> EditLoad(id,name,genero,cpf,email,telefone,titulo_prossional,experiencia,descricao)}
                                    >
                                    </Mecanicos>
                                )
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}
