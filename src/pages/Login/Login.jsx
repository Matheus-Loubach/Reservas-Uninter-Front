import '../Login/login.css'
import { Context } from '../../Context/AuthContext'
import { useContext } from 'react'


const Login = () => {

    const {message, setDataLogin, dataLogin, handleSubmitLogin } = useContext(Context);

    return (
        <div className="container-fundo">

            <div className="container_login">
                <form onSubmit={handleSubmitLogin}>
                    <div className="container_label">
                        <p htmlFor="email">E-mail</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
                        />
                    </div>

                    <div className="container_label">
                        <p htmlFor="password">Senha</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
                        />
                    </div>

                    <button type="submit">Login</button>
                    <p className="not-count">Não possui conta? <a href="/register">Cadastra-se</a></p>
                    <div>
                        {message.msg ? <p className='AlertMessage'>{message.msg}</p> : <p className="AlertMessageError">{message.error}</p>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login