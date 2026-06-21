import { Link } from "react-router";
import { Navbar } from "../components/navbar";
import { Vehicles } from "../components/Vehicle";
import { useEffect, useState } from "react";
import { api } from "../../service/api";

export default function PageVehicle() {
    const [vehicle,setvehicle] = useState([])
    useEffect(()=>{
        async function LoadData(){
            const res = await api.get('/vehiclesall')
            setvehicle(res.data)
        }
        LoadData()
    },[])
    return (
        <div className="container-fluid mt-page">
            <Navbar></Navbar>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Veiculos</h2>
                    <Link
                        to='/vehicles/add'
                        className="btn btn-outline-primary ms-5 mb-2"
                    >Adicionar Veiculo
                    </Link>
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Brands</th>
                            <th scope="col">Vehicle</th>
                            <th scope="col">Model</th>
                            
                        </tr>
                    </thead>
                    {vehicle && (
                        <tbody>
                            {vehicle.map(item => {
                                return (
                                    <Vehicles
                                        key={item.id}
                                        id={item.id}
                                        logo={item.logo}
                                        brand={item.brans}
                                        model={item.model}
                                        car={item.car}
                                        clickdelete={(id) => DeletLoad(id)}
                                        clickedit={(id, name, genero, cpf, email, telefone, titulo_prossional, experiencia, descricao) => EditLoad(id, name, genero, cpf, email, telefone, titulo_prossional, experiencia, descricao)}
                                    >
                                    </Vehicles>
                                )
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}