import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { Vehicles } from "../components/Vehicle";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { ModalDelete } from "../components/Modal";
import { LoadingScreen } from "../components/loading";

export default function PageVehicle() {
    const [loading, setloading] = useState(false)
    const [alertdelete, setalertdelete] = useState(false)
    const [iddelete, setiddelete] = useState('')
    const [vehicle, setvehicle] = useState([])
    const navigate = useNavigate()
    const awaiting = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    useEffect(() => {
        setloading(true)
        async function LoadData() {
            await awaiting(1500)
            const res = await api.get('/vehiclesall')
            setloading(false)
            setvehicle(res.data)
        }
        LoadData()
    }, [])
    async function DeletLoad(id) {
        setalertdelete(true)
        setiddelete(id)
    }
    async function DeleteService() {
        setloading(true)
        try {
            await awaiting(2500)
            const res = await api.delete(`/vehicle/delete/${iddelete}`)
            setalertdelete(false)
            setloading(false)
            window.location.reload()
            console.log(res.data)
        } catch (error) {
            setalert(true)
            setmsgalert(error.response.data.message)
            console.log(error.response.data.message)
            setTimeout(() => {
                setalert(!alert)
            }, 1000)
            setalertdelete(false)
            setloading(false)
        }
    }
    async function EditLoad(id_vehicle,brand,brandid,model,year,status){
        navigate('/vehicles/add/'+ id_vehicle, {
            state:{
                editbrand:brandid,
                editmodel:model,
                edityear:year,
                editstatus:status
            }
        })
    }
    return (
        <div className="container-fluid mt-page">
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            {alertdelete && (
                <ModalDelete
                    titulo='Deletar'
                    description='Voçê tem certeza que deseja deletar esse veiculo?'
                    onclick={() => setalertdelete(false)}
                    ondelete={() => DeleteService()}
                ></ModalDelete>
            )}
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
                            <th scope="col">Marca</th>
                            <th scope="col">Veiculo</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Ano</th>
                            <th scope="col">Status</th>
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
                                        brand={item.brand}
                                        brandid={item.id_brand}
                                        model={item.model}
                                        car={item.car}
                                        year={item.year}
                                        status={item.status}
                                        clickdelete={(id) => DeletLoad(id)}
                                        clickedit={(id,brand,brandid,model,year,status) => EditLoad(id, brand,brandid,model,year,status)}
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