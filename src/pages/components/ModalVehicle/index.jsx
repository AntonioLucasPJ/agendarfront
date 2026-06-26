import { useEffect, useState } from "react"
import { api } from "../../../service/api";

export function ModalAddVehicle({ isOpen, onClose, onConfirm, nomCliente }) {
    const [pesquisa, setpesquisa] = useState('')
    const [veiculoselecionado, setveiculoselecionado] = useState(null)
    const [placa, setplaca] = useState('');
    const [cor, setcor] = useState('')
    const [todosveiculos, setTodosVeiculos] = useState([])
    const isValid = veiculoselecionado !== '' && placa.length >= 7 && cor.length >= 4
    const aplicarMascarPlaca = (texto) => {
        let valor = texto.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
        valor = valor.substring(0, 7)
        if (valor.length <= 3) {
            return valor
        }
        const quatroCaractere = valor[3];
        const quintoCaractere = valor[4];
        if (quatroCaractere >= 0 && quatroCaractere <= '9') {
            if (quintoCaractere && (quintoCaractere < '0' || quintoCaractere > '9')) {
                return valor;
            }
            return valor.replace(/^([A-Z]{3})([0-9]{0,4})$/, "$1-$2")
        }
        return valor
    }
    const validarplacabrasileira = (placa) => {
        const placalimpa = placa.replace('-', '').toUpperCase()
        const regexAntiga = /^[A-Z]{3}[0-9]{4}$/;
        const regexMercosul = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
        return regexAntiga.test(placalimpa) || regexMercosul.test(placalimpa)
    }
    const veiculosFiltrados = todosveiculos.filter(veiculo => {
        const termo = pesquisa.toLowerCase();
        return veiculo.model.toLocaleLowerCase().includes(termo)
    })
    useEffect(() => {
        async function SearchVehicle() {
            const res = await api.get(`vehiclesall`)
            setTodosVeiculos(res.data)
        }
        SearchVehicle()
    }, [])
    useEffect(() => {
        if (!isOpen) {
            setpesquisa('')
            setveiculoselecionado(null)
            setplaca('')
            setcor('')
        }
    }, [isOpen])
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal fade show d-block" tabIndex='-1' style={{ zIndex: 1055 }}>
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
                    <div className="modal-content border-0 shadow-lg rounded-3">

                        <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                            <h5 className="modal-title fw-bold text-dark fs-4">
                                Vincular Veiculo ao Cliente:<span className="text-primary"></span>
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
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
                                        onChange={(e) => setpesquisa(e.target.value)}
                                    ></input>
                                </div>
                                {pesquisa && !veiculoselecionado && (
                                    <ul className="list-group position-absolute w-100 shadow-sm mt-1 overflow-auto" style={{ maxHeight: '150px', zIndex: 10 }}>
                                        {veiculosFiltrados.length > 0 ? (
                                            veiculosFiltrados.map(v => (
                                                <button
                                                    key={v.id}
                                                    type="button"
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-start py-2.5"
                                                    onClick={() => {
                                                        setveiculoselecionado(v)
                                                        setpesquisa(v.model)
                                                    }}
                                                >
                                                    <div>
                                                        <span className="fw-bold text-dark">{v.brand} {v.model}</span>
                                                        <small className="text-muted d-block">Ano:{v.year}</small>
                                                    </div>
                                                    <span className="badge bg-light text-dark border font-monospace px-2 py-1 ">{v.placa}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <li className="list-group-item text-muted small py-2.5">Nenhum Veiculo encontrado</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                            {veiculoselecionado && (
                                <div className="card border-0 p-3 mb-4 rounded-3" style={{ backgroundColor: '#FFFDF0', border: '1px solid #FFEAA7 !important' }}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img src={veiculoselecionado.logo} alt={veiculoselecionado.brand} style={{ width: '35px', height: '35px', objectFit: 'contain' }} className="me-2"></img>
                                            <img src={veiculoselecionado.car} alt={veiculoselecionado.model} className="rounded-2 border me-3 shadow-sm" style={{ width: '85px', height: '55px', objectFit: 'cover' }}></img>
                                            <div>
                                                <h6 className="fw-bold text-dark m-0">
                                                    {veiculoselecionado.brand} - {veiculoselecionado.model} - ({veiculoselecionado.year})
                                                </h6>
                                                <span className="badge bg-white text-dark border font-monospace mt-1 px-2 py-1">JOS-ICAR</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-sm text-danger p-1" onClick={() => setveiculoselecionado(null)}>
                                            <i className="bi bi-x-lg fs-5"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="row g-3 mb-2">
                                <h6 className="fw-bold text-dark m-0 mt-2">Informacoes</h6>
                                <div className="col-md-6">
                                    <label className="form-label text-secondary fw-semibold small mb-1">Placa do Veiculo</label>
                                    <input
                                        className="form-control"
                                        placeholder="Ex: CIE-3H80"
                                        value={placa}
                                        onChange={(e) => setplaca(aplicarMascarPlaca(e.target.value))}
                                    ></input>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-secondary fw-semibold small mb-1">Cor do Carro</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Prata"
                                        value={cor}
                                        onChange={(e) => setcor(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 pt-0 pb-4 px-4 flex-column">
                            <div className="d-flex w-100 gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light border fw-semibold w-50 py-2"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-dark fw-semibold w-50 py-2"
                                    disabled={!isValid}
                                    onClick={() => onConfirm({
                                        veiculoselecionado:veiculoselecionado,
                                        placa:placa,
                                        cor:cor
                                    })}
                                >
                                    Cadastrar Veiculo
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}