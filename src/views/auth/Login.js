import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { filterDoc } from '../../firebase/firebase';
import Alert from "../../components/Alerts/Alert";

const Login = () => {
    const navigate = useHistory();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const { login } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setError("");
        try {
            const username = user.username.toLowerCase().trim().concat('@gmail.com');
            const response = await login(username, user.password);
            if (response) {
                let user = response.user;
                const permisos = await filterDoc(user.uid, "usuarios", "id");
                permisos.forEach((data) => {
                    const { id } = data.data();
                    if (user.uid === id) {
                        user = data.data();
                    }
                });
                if (user !== null) {
                    if (user.esAdmin == null) {
                        navigate.push('/admin/users')
                    } else {
                        if (user.esAdmin)
                            navigate.push('/dashboard');
                        else
                            navigate.push('/companies');
                    }
                }
                setUser({
                    username: '',
                    password: ''
                });
            }
        } catch (error) {
            setError("Error al autenticar");
        }
    }

    const handleChanged = (evt) => {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <>
            <main>
                <section className="relative pb-20 w-full h-full py-40 min-h-screen bg-blueGray-800">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                    {error && <Alert message={error} />}
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-blueGray-500 text-xl font-bold">
                                                Iniciar sesi&oacute;n
                                            </h6>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                                            <small>Ingresa tus credenciales</small>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Usuario
                                                </label>
                                                <input
                                                    name="username"
                                                    value={user.username}
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Usuario"
                                                    onChange={handleChanged}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Contraseña
                                                </label>
                                                <input
                                                    name="password"
                                                    value={user.password}
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Contraseña"
                                                    onChange={handleChanged}
                                                />
                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    disabled={!user.username || !user.password}
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                >
                                                    Iniciar sesi&oacute;n
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;