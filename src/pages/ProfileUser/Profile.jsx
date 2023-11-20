import { useContext } from 'react'
import { Context } from '../../Context/AuthContext'
import { CgProfile } from "react-icons/cg";
import '../ProfileUser/Profile.css'

const Profile = () => {

    const { profileUser } = useContext(Context);

    const { email, user, userType } = profileUser;

    return (
        <div>
            <section className='container_profile'>
                <h1>Meu Perfil</h1>
                <div>
                    <CgProfile style={{ fontSize: '100px', paddingRight: '5px', color: 'white' }} />
                    <p>Nome: <span>{user}</span></p>
                    <p>Email: <span>{email}</span></p>
                    <p>Cargo: <span>{userType}</span> </p>
                </div>
            </section>
        </div>
    )
}

export default Profile