
import {
    FcOk
} from 'react-icons/fc'
export function Clients(props) {
    return <tr>
        <td scope="row">{props.id_user}</td>
        <td scope="row">{props.client}</td>
        <td scope="row">{props.cpf}</td>
        {props.email.length > 0 ?
            <td scope="row">{props.email}</td>
            :
            <td>Email nao preenchido</td>
        }
        <td scope="row">{props.telefone}</td>
        <td className="aling-midle" style={{ width: '150px' }}>
            {props.ativo === 'A' ? (
                <span className="badge bg-sucess-subtle text-success px-2.5 py-1.5 rounded-pill fw-semibold border-sucess-subtile" style={{ fontSize: '12px' }}>
                    <FcOk size={18} className="me-1"></FcOk>Ativo
                </span>
            ) : (
                <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill fw-semibold border-danger-subtle" style={{ fontSize: '12px' }}>
                    🔴 Inativo
                </span>
            )}
        </td>

        <td className="text-end">
            <div className="d-inline me-2">
                <button className="btn btn-sm btn-primary" onClick={() => props.clickedit(props.id_mecanico, props.name, props.genero, props.cpf, props.email, props.telefone, props.titulo_profissional, props.experiencia, props.descricao, props.ativo)}><i className="bi bi-pencil-square"></i></button>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => props.clickdelete(props.id_mecanico)}><i className="bi bi-trash3"></i></button>
        </td>
    </tr>
}