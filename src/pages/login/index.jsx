import styles from './login.module.css'
import logo from './img/logo.png';
import img1 from './img/mecanicoslogin.jpg';
import { Link, useNavigate } from 'react-router';
import { api } from '../../service/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserLogin';
import { LoadingScreen } from '../components/loading';
import { AlertMessage } from '../components/Alert';
export default function Login() {
    const [loading, setloading] = useState(false)
    const {
        setauthorizate,
        messageativa,
        setmessageativa,
        message,
        showtext,
        setshowtext,
        email,
        password,
        setemail,
        setpassword,
        HandleLogin } = useContext(UserContext)
    const navigate = useNavigate()
    const LoadLogin = async (e) => {
        e.preventDefault()
        setloading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        try {
            const login = await HandleLogin()
            navigate('/appointments')
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        if (!loading && messageativa) {
            const timer = setTimeout(() => {
                setmessageativa(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [messageativa])
    useEffect(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        setauthorizate(false)
        api.defaults.headers.authorizate = undefined
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.divlogo}>
                <img src={logo} className={styles.logo}></img>
            </div>
            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            <div className={styles.content} >
                {messageativa ?
                    <AlertMessage msg={message}></AlertMessage>
                    : ""
                }

                <form className={styles.formulario} onSubmit={LoadLogin}>
                    <h1 className={styles.title}>Login</h1>
                    <div className={styles.itensformulario}>
                        <div className={styles.divitens}>
                            <input required={true} type='email' placeholder='Email..' onChange={(e) => setemail(e.target.value)}></input>
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className={styles.divitens}>
                            <input disabled={email ==''?true:false} required={true} type={showtext ? '' : 'password'} placeholder='Senha...' onChange={(e) => setpassword(e.target.value)}></input>
                            <i onClick={(e) => setshowtext(!showtext)} className={showtext ? "bi bi-unlock" : "bi bi-lock"}></i>
                        </div>

                    </div>
                    <button className={styles.btn_acess} type='submit'
                        disabled={password ==''?true : false}
                    >Acessar</button>
                    <p>Não tem conta? <Link to='/singup' className={styles.linktext}>Criar conta agora</Link></p>
                </form>
            </div>

        </div>
    )
}
