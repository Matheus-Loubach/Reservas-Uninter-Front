
import './Painel.css'

const Painel = () => {
    return (
        <>
            <div className="container_painel">
                <section>
                    <div>
                        <h1>Painel</h1>
                    </div>
                    <article>
                        <a className='item' href="/view/all/reserva">Calendário</a>
                        <a className='item' href="/user/reserva">Solicitar Reserva</a>
                        <a className='item' href="/view/reserva">Minhas Reservas</a>
                    </article>
                </section>
            </div>
        </>
    )
}

export default Painel