import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux';
import { doGoogleLoginAction, doGoogleLogoutAction } from '../../redux/userDuck';

function LoginPage({ fetching, isLogged, doGoogleLoginAction, doGoogleLogoutAction }) {
    
    if(fetching) return <h2>Cargando...</h2>

    return (
        <div className={styles.container}>
            {isLogged && 
            <>
                <h1>
                Cierra tu sesión
                </h1>
                <button onClick={doGoogleLogoutAction}>
                    Cerrar Sesión
                </button>
            </>
            ||
            <>
                <h1>
                    Inicia Sesión con Google
                </h1>
                <button onClick={doGoogleLoginAction}>
                    Iniciar
                </button>
            </>
            }
        </div>
    )
}

let MapState = ({user : {loggedIn, fetching}}) =>{
    return {
        isLogged: loggedIn,
        fetching
    }
}

export default connect(MapState, {doGoogleLoginAction, doGoogleLogoutAction})(LoginPage)