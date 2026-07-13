import { vi } from "date-fns/locale";
import { useState } from "react";

export default function RedefinidorSenha({erroSenha, handleRedefinirSenha, setMostrarModalSenha }) {
    const [novaSenha, setNovaSenha] = useState('')
    const [ConfirmarSenha, setConfirmarSenha] = useState('')
    const [visualizarsenha, setvisualizarsenha] = useState(false)
    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title d-flex align-items-center gap-2">
                            <i className="bi bi-key-fill"></i> Alterar Senha
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => { setMostrarModalSenha(false); setErroSenha(''); }}
                        ></button>
                    </div>

                    <form>
                        <div className="modal-body p-4">
                            {erroSenha && (
                                <div className="alert alert-danger py-2" role="alert" style={{ fontSize: '14px' }}>
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {erroSenha}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label text-secondary fw-semibold">Nova Senha</label>
                                <input
                                    type={visualizarsenha ? "text" : "password"}
                                    className="form-control form-control-lg"
                                    placeholder="Mínimo 6 caracteres"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-secondary fw-semibold">Confirmar Nova Senha</label>
                                <div className="input-group">
                                    <input
                                        type={visualizarsenha ? "text" : "password"}
                                        className="form-control form-control-lg"
                                        placeholder="Digite a senha novamente"
                                        value={ConfirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setvisualizarsenha(!visualizarsenha)}
                                    >
                                        <i className={`bi ${visualizarsenha ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                    </button>
                                </div>


                            </div>
                        </div>

                        <div className="modal-footer bg-light">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => { setMostrarModalSenha(false); setErroSenha(''); }}
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-danger px-4" onClick={() => handleRedefinirSenha({
                                novasenha:novaSenha,
                                confirmarsenha:ConfirmarSenha,

                            })}>
                                Salvar Nova Senha
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}