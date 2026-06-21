
import {
    FcOk
} from 'react-icons/fc'
export function Vehicles(props) {
    return <tr>
        <td scope="row" className='aling-middle ps-4 fw-medium text-secondary'>{props.id}</td>
        <td scope='row' className='aling-middle'>
            {props.logo ? (
                <img
                    src={props.logo}
                    alt={`Logo ${props.brand}`}
                    className='img-fluid'
                    style={{ height: '30px', objectFit: 'contain' }}
                ></img>
            ) : (
                <span className='text-muted small' style={{ fontSize: '12px' }}>Sem Logo</span>
            )}
        </td>
        <td scope='row' className='aling-middle'>
            <div className='d-flex align-items-center gap2'>
                {props.logo ? (
                    <img
                        src={props.car}
                        alt={`Logo ${props.model}`}
                        className='img-fluid rounded'
                        style={{ height: '30px', objectFit: 'contain' }}
                    ></img>
                ) : (
                    <div className='bg-ligth border rounded d-flex align-items-center justify-content-center'style={{ width: '50px', height: '35px', fontSize: '18px'}}>
                    <span className='text-muted' style={{ fontSize: '12px' }}>Sem Logo</span>
                    </div>
                )}
            </div>

        </td>
        <td scope="row" className='align-middle fw-semibold text-dark'>{props.model}</td>
        {/* <td className="text-center" style={{ width: '150px' }}>
            {props.ativo === 'A' ? (
                <span className="badge bg-sucess-subtle text-success px-2.5 py-1.5 rounded-pill fw-semibold border-sucess-subtile" style={{ fontSize: '12px' }}>
                    <FcOk size={18} className="me-1"></FcOk>Ativo
                </span>
            ) : (
                <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill fw-semibold border-danger-subtle" style={{ fontSize: '12px' }}>
                    🔴 Inativo
                </span>
            )}
        </td> */}

        <td className="text-end align-middle pe-4">
            <div className="d-inline me-2">
                <button className="btn btn-sm btn-outline-primary me-2 border-0" onClick={() => props.clickedit(props.id, props.logo, props.brand, props.model, props.car)}><i className="bi bi-pencil-square"></i></button>
            </div>
            <button className="btn btn-sm btn-outline-danger border-0" onClick={() => props.clickdelete(props.id)}><i className="bi bi-trash3"></i></button>
        </td>
    </tr>
}