import { useEffect, useState } from "react"

export function ModalAddVehicle(isOpen,onClose,onConfirm,nomCliente) {
    const [pesquisa,setpesquisa] = useState('')
    const [veiculoselecionado,setveiculoselecionado] = useState(null)
    const [quilometragem,setquilometragem] = useState('');
    const [cor,setcor] = useState('')
    const [todosveiculos,setTodosVeiculos] = useState([
        {id_veiculo:10, marca:'Toyota',modelo:"Corolla",ano:2022,placa:'OIZ-3H81',logo:""}
    ])
    const veiculosFiltrados = todosveiculos.filter(veiculo =>{
        const termo = pesquisa.toLowerCase();
        return veiculo.placa.toLowerCase().includes(termo)|| veiculo.modelo.toLocaleLowerCase().includes(termo)
    })
    useEffect(()=>{
        if(!isOpen){
            setpesquisa('')
            setveiculoselecionado(null)
            setquilometragem('')
            setcor('')
        }
    },[isOpen])
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal fade show d-block" tabIndex='-1' style={{ zIndex: 1055 }}>
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
                    <div className="modal-content border-0 shadow-lg rounded-3">
                        <div className="modal-title fw-bold text-dark fs-4">
                            <h5 className="modal-title fw-bold text-dark fs-4">
                                Vincular Veiculo ao Cliente:<span className="text-primary"></span>
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                    </div>
                    <div className="modal-body px-4 py-3">
                        <div className="mb-3">
                            <label className="form-label text-secondary fw-semibold small">
                                Pesquisar Veiculo Existente (Placa/Modelo)
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 ps-0 form-select-lg"
                                    placeholder="Digite para buscar..."
                                    value={pesquisa}
                                    onChange={(e)=> setpesquisa(e.target.value)}
                                ></input>
                            </div>
                            {pesquisa && !veiculoselecionado && (
                                <ul className="list-group position-absolute w-100 shadow-sm mt-1 overflow-auto" style={{maxHeight:'150px',zIndex:10}}>
                                    {veiculosFiltrados.length >0 ?(
                                        veiculosFiltrados.map(v => (
                                            <button
                                                key={v.id_veiculo}
                                                type="button"
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-start py-2.5"
                                                onClick={()=>{
                                                    setveiculoselecionado(v)
                                                    setpesquisa(v.modelo)
                                                }}
                                            >
                                                <div>
                                                    <span className="fw-bold text-dark">{v.marca} {v.modelo}</span>
                                                    <small className="text-muted d-block">Ano:{v.ano}</small>
                                                </div>
                                                <span className="badge bg-light text-dark border font-monospace px-2 py-1 ">{v.placa}</span>
                                            </button>
                                        ))
                                    ):(
                                        <li className="list-group-item text-muted small py-2.5">Nenhum Veiculo encontrado</li>
                                    )}
                                </ul>
                            )}
                        </div>
                        {veiculoselecionado && (
                            <div className="card border-0 p-3 mb-4 rounded-3" style={{backgroundColor:'#FFFDF0',border:'1px solid #FFEAA7 !important'}}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <img src={veiculoselecionado.logo} alt={veiculoselecionado.marca} style={{width:'35px',height:'35px',objectFit:'contain'}} className="me-2"></img>
                                        <img src={veiculoselecionado.foto} alt={veiculoselecionado.modelo} className="rounded-2 border me-3 shadow-sm" style={{width:'85px',height:'55px',objectFit:'cover'}}></img>
                                        <div>
                                            <h6 className="fw-bold text-dark m-0">
                                                {veiculoselecionado.marca} {veiculoselecionado.modelo} ({veiculoselecionado.ano})
                                            </h6>
                                            <span className="badge bg-white text-dark border font-monospace mt-1 px-2 py-1">{veiculoselecionado.placa}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}