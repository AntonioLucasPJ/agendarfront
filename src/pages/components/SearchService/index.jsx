import { Image, Text, TouchableOpacity, View } from "react";

import {
    FaCalendarCheck,
    FaCarCrash,
    FaOilCan,
    FaTools,
    FaWrench,
    FaBold,
    FaEdit,
    FaTrashAlt,
    FaBolt
} from 'react-icons/fa'
import {
    FcOk
} from 'react-icons/fc'

const MapeamentoIcones = ({ nomeicon }) => {
    const icones = {
        "calendar-check": <FaCalendarCheck className="text-primary" size={18}></FaCalendarCheck>,
        "car-brake-abs": <FaCarCrash className="text-primary" size={18}></FaCarCrash>,
        "oil": <FaOilCan className="text-primary" size={18}></FaOilCan>,
        'engine-outline': <FaTools className="text-dark" size={18} />,
        'wrench': <FaWrench className="text-secondary" size={18} />,
        'lightning-bolt-outline': <FaBolt className="text-warning" size={18} />,
        'outher': <FaWrench className="text-muted" size={18} />,
    }
    return icones[nomeicon] || <FaWrench className="text-muted" size={18}></FaWrench>
}
export function SearchService(props) {
    return (
        <tr style={{ transition: 'all 0.2s' }}>
            <td scope="row" className="aling-middle ps-4 text-secondary small fw-medium" style={{ width: '5%' }}>{props.id_service}</td>
            <td className=" aling-middle " style={{ width: '80px' }}>
                <div className="d-inline-flex p-2 bg-light rounded-3">
                    <MapeamentoIcones nomeicon={props.icone_id}></MapeamentoIcones>
                </div>
            </td>
            <td scope="row" className="fw-bold text-dark" style={{ fontSize: '14px', width: '220px' }}>{props.service}</td>
            <td scope="row">
                <div className="text-muted text-truncate small" style={{ maxWidth: '450px' }}>
                    {props.description}
                </div>
            </td>
            <td className="aling-middle" style={{ width: '10px' }}>
                {props.status === 'A' ? (
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
                    <button className="btn btn-sm btn-primary" onClick={() => props.clickedit(props.id_service, props.service, props.description, props.icone_id, props.status)}><i className="bi bi-pencil-square"></i></button>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => props.clickdelete(props.id_service)}><i className="bi bi-trash3"></i></button>
            </td>
        </tr>
    )
}