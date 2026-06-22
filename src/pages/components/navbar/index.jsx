import './navbar.css'
import logo from './img/logo.png'
import { Link, Navigate, useFetcher } from 'react-router'
import { UserContext } from '../../../context/UserLogin'
import { useContext, useEffect } from 'react'

export function Navbar() {
    const { user, setauthorizate } = useContext(UserContext)
    const token = localStorage.getItem(`token`)
    const username = user || localStorage.getItem(`name`)
    function desconectar() {
        setauthorizate(false)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        api.defaults.headers.Authorization = undefined
        Navigate('/')
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-primary">
            <div className='container-fluid d-flex justify-content-between align-items-center'>
                <Link className='navbar-brand user-select-none' to='/appointments'>
                    <img className='navbarlogo user-select-none' src={logo} style={{ height: '50px', width: "auto" }}></img>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mg-lg-0'>
                        <li className="nav-item user-select-none">
                            <Link className="nav-link active text-white" to='/appointments'><i className="bi bi-calendar3"></i> Agendamentos</Link>
                        </li>
                        <li className='nav-item user-select-none'>
                            <Link className="nav-link active text-white" aria-current="page" to='/mecanicos'><i className="bi bi-people-fill"></i> Mecanicos</Link>
                        </li>
                        <li className='nav-item user-select-none'>
                            <Link className="nav-link active text-white" aria-current="page" to='/services'><i className="bi bi-gear"></i> Services</Link>
                        </li>
                        <li className='nav-item user-select-none'>
                            <Link className="nav-link active text-white" aria-current="page" to='/vehicles'><i className="bi bi-car-front"></i> Vehicles</Link>
                        </li>
                        <li className='nav-item user-select-none'>
                            <Link className="nav-link active text-white" aria-current="page" to='/clients'><i className="bi bi-car-front"></i> Clientes</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username ? username : "Usuario não indentificado"}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" href="#">Meu Perfil</Link></li>
                                    <li><Link className="dropdown-item" onClick={() => desconectar()}>Desconectar</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

