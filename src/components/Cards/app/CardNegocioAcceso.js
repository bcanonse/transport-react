import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { getCollections } from "firebase/firebase";

import { useAuth } from "context/AuthProvider";
import { filterDoc } from "firebase/firebase";

const CardNegocioAcceso = ({ color }) => {
    const navigate = useHistory();

    const { user } = useAuth();
    const [negocios, setNegocios] = React.useState([]);

    const getAccesoUsuarios = async () => {
        const values = [];
        let negociosList = [];
        if (user) {
            const resAcceso = await filterDoc(user.uid, "acceso_usuarios", "id_usuario");
            resAcceso.forEach(element => {
                values.push(element.data())
            });

            const negocios = await getCollections("negocios");
            negocios.forEach(element => {
                const { codigo } = element.data();
                for (const value of values) {
                    const { id_negocio: codigoNegocio } = value;
                    if (codigoNegocio !== codigo) continue
                    negociosList.push(element.data())
                }
            })

        }
        setNegocios(negociosList.sort())
    }

    React.useEffect(() => {
        getAccesoUsuarios();
    }, []);

    const handleClickItem = (data, evt) => {
        localStorage.clear()
        localStorage.setItem("negocio", JSON.stringify(data));
        navigate.push({
            pathname: '/app',
        });
    }



    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full px-4 flex-grow flex">
                            <div className="w-1/2 text-left">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
                                    }
                                >
                                    Negocios
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Nombre
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {negocios.map((data, index) => {
                                return (
                                    <tr
                                        className="cursor-pointer"
                                        key={index}
                                        onClick={handleClickItem.bind(this, data)}

                                    >
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {data.nombre}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CardNegocioAcceso.defaultProps = {
    color: "light",
};

CardNegocioAcceso.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default CardNegocioAcceso;