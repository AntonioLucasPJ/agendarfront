import { Link } from "react-router";
import { Navbar } from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { ContextMecanicos } from "../../context/Mecanicos";
import { Mecanicos } from "../components/mecanicos";
import { LoadingScreen } from "../components/loading";

export default function PageMecanicos() {
    const { mecanicos, SearchMecanicos } = useContext(ContextMecanicos)
    const [laoding, setloading] = useState(false)
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
    return (
        <div className="container-fluid mt-page">
            {laoding && (
                <LoadingScreen></LoadingScreen>
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
                            <th scope="col">Specialidade</th>
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
                                        specialty={item.specialty}
                                        situacao={item.situacao}
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
