import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Context = createContext('');

const AuthContext = ({ children }) => {

    const navigate = useNavigate();

    // Obtendo o ID do usuário salvo no armazenamento local
    const dataID = localStorage.getItem("id");

    // Informações do usuário salvas no armazenamento local
    const dataUser = localStorage.getItem("dataUser");

    // Token do usuário
    const [tokenUser, setTokenUser] = useState();

    // Estado de autenticação
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileUser, setProfileUser] = useState(dataUser || null);
    const [idUserOn, setIdUserOn] = useState(dataID || null);

    // Reservas do usuário pela ID
    const [reserverUser, setReserveUser] = useState();

    // Resposta das requisições
    const [message, setMessage] = useState("");

    // Reservas de todos os usuários
    const [reserveALL, setReserveALL] = useState();

    // Dados de login
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    });

    // Dados de registro do usuário
    const [dataRegister, setDataRegister] = useState({
        user: '',
        email: '',
        password: '',
        passwordConf: '',
        userType: '', // Novo campo para o emprego
    });


    // Função para lidar com o envio de login
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataLogin),
            });

            const resJson = await response.json();
            setMessage(resJson);
            if (resJson.token) {
                setTokenUser(resJson.token);
                localStorage.setItem("auth", true);
                localStorage.setItem("token", resJson.token);
                navigate('/user');
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("auth");
                navigate('/');
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    // Função para lidar com o envio de registro
    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataRegister),
            });
            const res = await response.json();

            if (res.error) {
                console.log(res.error);
                setMessage(res)
            }
            if (res.msg) {
                navigate('/')
                setMessage(res)
            }
            else {
                console.error('Erro no registro.');
            }
        } catch (error) {
            console.error('Erro ao enviar dados para o servidor:', error);
        }
    };

    // Função para deletar reserva (admin)
    const deleteReserveAdmin = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete/reserve/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenUser}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                const errorData = await response.json();
                console.log(errorData.msg); // Log the error message from the server
            }
        } catch (error) {
            console.error(error, 'Error during delete reservation');
        }
    };

    // Verifica se o token do usuário é válido e, se for, retorna as informações do perfil
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/profile", {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });
                const data = await response.json();

                // Verifique se _id é uma string válida antes de usar
                const idUser = data._id ? data._id : null;

                localStorage.setItem("dataUser", JSON.stringify(data));
                localStorage.setItem("id", idUser);
                setProfileUser(data);
                setIdUserOn(idUser);
            } catch (error) {
                console.log('Erro ao obter o perfil do usuário:', error);
            }
        };
        fetchProfile();
    }, [tokenUser]);


    // Verifica a autentificação ao carregar a página
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        const storedToken = localStorage.getItem('token');
        if (storedToken && storedAuth) {
            setIsAuthenticated(storedAuth);
            setTokenUser(storedToken);
        }
    }, [setIsAuthenticated, navigate, setTokenUser]);

    // Busca das reservas do usuário pela ID
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/search/reserve/" + idUserOn, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });
                const data = await response.json();
                setReserveUser(data);
            } catch (error) {
                console.log(error, 'Usuário sem permissão');
            }
        };
        fetchProfile();
    }, [idUserOn, tokenUser]);

    // Busca de todas as reservas
    useEffect(() => {
        const fetchReserves = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/search/reserve/", {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                });
                const data = await response.json();
                setReserveALL(data);
                console.log(data);
            } catch (error) {
                console.log(error, 'Error fetching all reserves');
            }
        };
        fetchReserves();
    }, [tokenUser]);

    // Função para sair/logout
    const exit = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem("id");
        localStorage.removeItem("dataUser");
        setIsAuthenticated(false);
        navigate('/')
    }

    // Dados da reserva
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pendente', // Definindo o status como "Pendente" por padrão
    });

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    // Função para enviar reserva
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/create/reserve", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    status: formData.status,
                    idUser: idUserOn,
                }),
            });
            const json = await response.json();
            setMessage(json);

        } catch (error) {
            console.error(error);
        }

    };

    // Função para formatar a data
    function formatarData(dataDoMongoDB) {
        const dataObjeto = new Date(dataDoMongoDB);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }


    return (
        <Context.Provider
            value={{
                setDataLogin,
                dataLogin,
                handleSubmitLogin,
                isAuthenticated,
                tokenUser,
                profileUser,
                exit,
                idUserOn,
                handleChange,
                handleSubmit,
                formData,
                reserverUser,
                reserveALL,
                handleSubmitRegister,
                setDataRegister,
                dataRegister,
                formatarData,
                deleteReserveAdmin,
                message,
            }}
        >
            {children}
        </Context.Provider>
    );
}

AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export { Context, AuthContext };