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
        </td>
    </tr>
}