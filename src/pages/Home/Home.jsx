// Home.js

import '../Home/Home.css';

import logo from '../../assets/logo.png'
import { useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { CgProfile } from "react-icons/cg";
import { BiExit } from "react-icons/bi";

const Home = () => {

  const { profileUser, exit } = useContext(Context);

  const { user } = profileUser

  return (
    <>
      <div className="container_user">
        <a href="/user"><img src={logo} alt="logo" /></a>
        <nav>
          <ul className="menu">
            <CgProfile style={{ fontSize: '20px', paddingRight: '5px' }} />
            <li> <a href="/profile">{user}</a></li>
            <BiExit style={{ fontSize: '20px', paddingRight: '5px' }} />
            <li onClick={exit}>Sair</li>
          </ul>
        </nav>
      </div>

    </>
  );
};

export default Home;
