import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Painel from './pages/Painel/Painel'
import Reserve from './pages/Reserve/Reserve'
import { useContext } from 'react'
import { Context } from './Context/AuthContext'
import MyReservers from './pages/MyReservers/MyReservers'
import AllReserves from './pages/AllReserves/AllReserves'
import Profile from './pages/ProfileUser/Profile'


function App() {

  const { isAuthenticated } = useContext(Context)



  return (
    <>

      {isAuthenticated && <Home />} {/* Menu NavBar*/}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={isAuthenticated && <Painel />} />  {/*Tela Inicial*/}
        <Route path="/profile" element={isAuthenticated && <Profile />} />  {/*Perfil Usuario*/}
        <Route path="/user/reserva" element={isAuthenticated && <Reserve />} /> {/* Solicitar Reserva */}
        <Route path="/view/reserva" element={isAuthenticated && <MyReservers />} /> {/*Reservas do usuario*/}
        <Route path="/view/all/reserva" element={isAuthenticated && <AllReserves />} /> {/*Calendario*/}
        <Route path="/*" element={isAuthenticated && <Painel />} />
        <Route path="/*" element={!isAuthenticated && <Register />} />
      </Routes>
    </>
  )
}

export default App
