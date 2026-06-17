<<<<<<< HEAD
export function Mecanicos(props) {
    return <tr>
        <td scope="row">{props.id_mecanico}</td>
        <td scope="row">{props.name}</td>
        <td scope="row">{props.specialty}</td>
        <td scope="row">{props.situacao}</td>
        <td className="text-end">
            <div className="d-inline me-2">
                <button className="btn btn-sm btn-primary" onClick={() => props.clickedit(props.id_appointement)}><i className="bi bi-pencil-square"></i></button>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => props.clickdelete(props.id_appointement)}><i className="bi bi-trash3"></i></button>
=======

import {
    FcOk
} from 'react-icons/fc'
export function Mecanicos(props) {
    const formatarEspecialidade = (props) =>{
        if(!props.services) return 'Nehuma';
        console.log(props.services)
        try {
            const lista = typeof props.services === 'string' ? JSON.parse(services):props.services
            if(Array.isArray(lista)){
                return lista.join(", ")
            }
            return String(props.services)
        }catch(error){
            return String(props.services)
        }
    }
    return <tr>
        <td scope="row">{props.id_mecanico}</td>
        <td scope="row">{props.name}</td>
        <td scope="row">{formatarEspecialidade(props.services)}</td>
                    <td className="text-center" style={{ width: '150px' }}>
                        {props.ativo === 'A' ? (
                            <span className="badge bg-sucess-subtle text-success px-2.5 py-1.5 rounded-pill fw-semibold border-sucess-subtile" style={{fontSize:'12px'}}>
                                <FcOk size={18} className="me-1"></FcOk>Ativo
                            </span>
                        ) : (
                            <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill fw-semibold border-danger-subtle" style={{fontSize:'12px'}}>
                                🔴 Inativo
                            </span>
                        )}
                    </td>
                    
        <td className="text-end">
            <div className="d-inline me-2">
                <button className="btn btn-sm btn-primary" onClick={() => props.clickedit(props.id_mecanico,props.name,props.genero,props.cpf,props.email,props.telefone,props.descricao)}><i className="bi bi-pencil-square"></i></button>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => props.clickdelete(props.id_mecanico)}><i className="bi bi-trash3"></i></button>
>>>>>>> e1b826c (update 3.6)
        </td>
    </tr>
}