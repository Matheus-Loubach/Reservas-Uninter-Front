import { useContext } from "react";
import { Context } from "../../Context/AuthContext";

const Register = () => {


  const { message, handleSubmitRegister, setDataRegister, dataRegister } = useContext(Context);


  return (
    <div className="container_login">
      <form onSubmit={handleSubmitRegister}>
        <div className="container_label">
          <input
            type="text"
            name="user"
            placeholder="Seu nome de usuário"
            onChange={(e) => setDataRegister({ ...dataRegister, user: e.target.value })}
          />
        </div>
        <div className="container_label">
          <input
            type="email"
            name="email"
            placeholder="Seu melhor E-mail"
            onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
          />
        </div>
        <div className="container_label">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })}
          />
        </div>
        <div className="container_label">
          <input
            type="password"
            name="passwordConf"
            placeholder="Confirme a Senha"
            onChange={(e) => setDataRegister({ ...dataRegister, passwordConf: e.target.value })}
          />
        </div>
        <div className="container_label">
          <label htmlFor="employment">Selecione sua área:</label>
          <select
            name="userType"
            id="userType"
            onChange={(e) => setDataRegister({ ...dataRegister, userType: e.target.value })}
          >
            <option
              value=""
              disabled selected >
              Selecione seu cargo
            </option>
            <option value="Estudante">Estudante</option>
            <option value="Professor">Professor(a)</option>
            <option value="Diretor">Diretor(a)</option>
            <option value="Coordenador">Coordenador(a)</option>
            <option value="Secretário">Secretário(a)</option>
            <option value="Bibliotecário">Bibliotecário(a)</option>
            <option value="Zelador">Zelador(a)</option>
          </select>
        </div>

        <button type="submit">Enviar</button>
        <div>
          {message.msg ? <p className='AlertMessage'>{message.msg}</p> : <p className="AlertMessageError">{message.error}</p>}
        </div>
      </form>
    </div>
  )
}

export default Register