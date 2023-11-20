import { useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import '../Reserve/Reserve.css'; // Importe o arquivo de estilo

const Reserve = () => {
    const { message, handleChange, handleSubmit, formData } = useContext(Context);
    console.log(message);
    return (
        <div className="container_reserver">
            <div>

                <h1>Cadastro de reserva</h1>
                <form onSubmit={handleSubmit}>
                    <div className="container_label">
                        <p htmlFor="title">Titulo</p>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            placeholder="Titulo da Reserva"
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className="container_label">
                        <p htmlFor="description">Descrição</p>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            placeholder="Descrição da Reserva"
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <button type="submit">Enviar</button>
                    <div>
                        {message && <p className='AlertMessage'>{message.msg}</p>}
                    </div>
                </form>

            </div>

        </div>
    );
}

export default Reserve;
