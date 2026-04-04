import './navbar.css'
import logo from './img/logo.png'
import { Link, Navigate, useFetcher } from 'react-router'
import { UserContext } from '../../../context/UserLogin'
import { useContext, useEffect } from 'react'

export function Navbar() {
    const {name, setauthorizate} = useContext(UserContext)
    const token = localStorage.getItem('token')
    const username = name ||localStorage.getItem('name')
    function desconectar() {
        setauthorizate(false)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        api.defaults.headers.Authorization = undefined
        Navigate('/')
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-home="dark">
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/appointments'>
                    <img className='navbarlogo' src={logo}></img>
                </Link>
                <button
                className="navbar-toggler btn-primary" 
                type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse d-flex justify-content align-items-center' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mg-lg-0'>
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to='/appointments'>Agendamentos</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link active text-white" aria-current="page" to='/mecanicos'>Mecanicos</Link>
                            </li>
                        </ul>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username?username:"Usuario não indentificado"}
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

