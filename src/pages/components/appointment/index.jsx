export function Appointment(props) {
    const convertedt = new Date(props.booking_date).toLocaleDateString('pt-BR',{
        timeZone:"UTC"
    })
    return <tr>
        <td scope="row">{props.client}</td>
        <td scope="row">{props.mecanico}</td>
        <td scope="row">{props.service}</td>
        <td scope="row">{props.booking_date?`${convertedt} - ${props.booking_hour}`:'Data invalida'}
        </td>
        <td scope="row" className="text-end">R${props.price}</td>
        <td className="text-end">
            <div className="d-inline me-2">
                <button className="btn btn-sm btn-primary" onClick={() => props.clickedit(props.id_appointement,props.client)}><i className="bi bi-pencil-square"></i></button>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => props.clickdelete(props.id_appointement)}><i className="bi bi-trash3"></i></button>

        </td>
    </tr>
}