import { useContext, useEffect, useState } from 'react';
import styles from './Cadastro.module.css'
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../context/UserLogin';
import { LoadingScreen } from '../components/loading';
import { AlertMessage } from '../components/Alert';

export default function Cadastro() {
    const navigate = useNavigate()
    const [loading,setloading] = useState(false)
    const {
        setmessageativa,messageativa,
        message,
        showtext,
        setshowtext,
        name,setname,
        email,
        telefone,settelefone,
        password,
        setemail,
        setpassword,
        CreateSingup } = useContext(UserContext)
    async function Singup(e) {
        e.preventDefault()
        setloading(true)
        await new Promise(resolve => setTimeout(resolve,2000))
        try {
            const createsing = await CreateSingup()
            navigate('/appointments')
        }catch(error){
            setloading(false)
            console.log(error)
        }
    }
    useEffect(()=>{
        if(!loading && messageativa){
            const timer = setTimeout(()=>{
                setmessageativa(false)
            },5000)
            return ()=> clearTimeout(timer)
        }
    },[messageativa])
    return (
        <div className={styles.container}>

            {loading && (
                <LoadingScreen></LoadingScreen>
            )}
            <div className={styles.content} >
                {messageativa ?
                    <AlertMessage msg={message}></AlertMessage>
                    : ""
                }

                <form className={styles.formulario} onSubmit={Singup}>
                    <h1 className={styles.title}>SingUp</h1>
                    <div className={styles.itensformulario}>
                        <div className={styles.divitens}>
                            <input required={true} placeholder='Nome..' onChange={(e) => setname(e.target.value)}></input>
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className={styles.divitens}>
                            <input required={true} disabled={name == '' ? true : false} type='email' placeholder='Email..' onChange={(e) => setemail(e.target.value)}></input>
                            <i className="bi bi-envelope"></i>
                        </div>
                        <div className={styles.divitens}>
                            <input required={true} disabled={email == '' ? true : false} placeholder='Telefone' onChange={(e) => settelefone(e.target.value)}></input>
                            <i className="bi bi-telephone"></i>
                        </div>
                        <div className={styles.divitens}>
                            <input required={true} disabled={telefone == '' ? true : false} type={showtext ? '' : 'password'} placeholder='Senha...' onChange={(e) => setpassword(e.target.value)}></input>
                            <i onClick={(e) => setshowtext(!showtext)} className={showtext ? "bi bi-unlock" : "bi bi-lock"}></i>
                        </div>

                    </div>
                    <button className={styles.btn_acess} type='submit'
                        disabled={password == '' ? true : false}
                    >Cadastrar</button>
                    <p>Ja possui uma conta? <Link to='/' className={styles.linktext}>Acessar agora</Link></p>
                </form>
            </div>
            <div className={styles.divlogo}>
                <img src={logo} className={styles.logo}></img>
            </div>
        </div>
    )
}
