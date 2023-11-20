import { useContext } from 'react'
import { Context } from '../../Context/AuthContext'
import '../MyReservers/MyReserves.css'

const MyReservers = () => {

  const { reserverUser, formatarData } = useContext(Context)

  const deleteReserveAdmin = async (id) => {
    try {
      const response = await fetch(`https://reservas-uninter-back.vercel.app/api/delete/reserve/${id}`, {
        method: 'DELETE',
      });

      console.log('delete', response);

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


  return (
    <div>
      <div className="service-details">
        <table>
          <thead>
            <tr>
              <th>Criado</th>
              <th>Usuário</th>
              <th>Pedido</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {reserverUser && Array.isArray(reserverUser) && reserverUser.map((data) => (
              <tr key={data._id}>
                <td>{formatarData(data.createdAt)}</td>
                <td>{data.user}</td>
                <td>{data.title}</td>
                <td>{data.userType}</td>
                <td>{data.status}</td>
                <td>{formatarData(data.updatedAt)}</td>
                {reserverUser ? <button onClick={() => deleteReserveAdmin(data._id)}>X</button> : null}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyReservers