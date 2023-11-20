/* eslint-disable react/prop-types */
import { useContext } from 'react';
import ReactModal from 'react-modal';
import { Context } from '../../Context/AuthContext';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve }) => {

    const { formatarData } = useContext(Context);


    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes da Reserva">
            <h2>Detalhes da Reserva</h2>
            {reserve && (
                <>
                    <p>Data de Criação: {formatarData(reserve.createdAt)}</p>
                    <p>Título: {reserve.title}</p>
                    <p>Descrição: {reserve.description}</p>
                    <p>Usuário: {reserve.user}</p>
                    <p>Tipo de Usuário: {reserve.userType}</p>
                    <p>Status: {reserve.status}</p>
                    <p>Data de Atualização: {formatarData(reserve.updatedAt)}</p>
                </>
            )}
            <button onClick={onClose}>Fechar</button>
        </ReactModal>
    );


};


export default Modal