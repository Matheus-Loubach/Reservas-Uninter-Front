import { useContext, useState } from "react"
import { Context } from "../../Context/AuthContext"
import Modal from "../ReserveModal/Modal";


const AllReserves = () => {

  const { profileUser, reserveALL, formatarData } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReserve, setSelectedReserve] = useState(null);

  //Delete Reserve 
  const deleteReserveAdmin = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/reserve/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.msg);
      } else {
        const errorData = await response.json();
        console.log(errorData.msg);
      }
    } catch (error) {
      console.error(error, 'Error during delete reservation');
    }
  };

  //Função para atualizar status(Admin)
  const updateReserveStatus = async (id, newStatus) => {

    try {
      const response = await fetch(`http://localhost:3000/api/update/reserve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      console.log('update', reserveALL);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.msg);
      } else {
        const errorData = await response.json();
        console.log(errorData.msg);
      }
    } catch (error) {
      console.error(error, 'Error during update reservation status');
    }
  };

  const openModal = (data) => {
    setSelectedReserve(data);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="service-details">
        <table>
          <thead>
            <tr>
              <th>Informações</th>
              <th>Criado</th>
              <th>Usuário</th>
              <th>Pedido</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Atualizado</th>
              {profileUser.userType === "Admin" && <th>Ações</th>}
            </tr>
          </thead>
          <tbody className="container_reserveALL">
            {reserveALL &&
              Array.isArray(reserveALL) &&
              reserveALL.map((data) => (
                <tr key={data._id} >
                  <td><button onClick={() => openModal(data)}>Ver Detalhes</button></td>
                  <td>{formatarData(data.createdAt)}</td>
                  <td>{data.user}</td>
                  <td>{data.title}</td>
                  <td>{data.userType}</td>
                  <td>{data.status}</td>
                  <td>{formatarData(data.updatedAt)}</td>
                  <td>
                    {profileUser.userType === "Admin" && (
                      <>
                        <button className="buttonDelete" onClick={() => deleteReserveAdmin(data._id)}>Excluir</button>
                        <button className="buttonAccept" onClick={() => updateReserveStatus(data._id, "Aceito")}>Aceitar</button>
                        <button className="buttonDenied" onClick={() => updateReserveStatus(data._id, "Negado")}>Negar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
          {selectedReserve && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setSelectedReserve(null);
                setIsModalOpen(false);
              }}
              reserve={selectedReserve}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default AllReserves;