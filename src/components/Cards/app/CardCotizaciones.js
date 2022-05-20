import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const CardCotizaciones = ({ color, title, list }) => {
    const navigate = useHistory();

    const handleClickNavigate = () => {
        navigate.push({
            pathname: '/app/quotes/create'
        });
    }


    const handleClickItem = (data, evt) => {
        navigate.push({
            pathname: '/app/quotes/modify',
            state: data
        })
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
                                    {title}
                                </h3>
                            </div>
                            <div className="w-1/2">
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    onClick={handleClickNavigate}
                                >
                                    Agregar
                                </button>
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
                                    Lo solicita
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Descripci&oacute;n
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Email
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                    Fecha y hora de cotizaci&oacute;n
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((data, index) => (
                                <>
                                    <tr
                                        className="cursor-pointer"
                                        key={index}
                                        onClick={handleClickItem.bind(this, data)}

                                    >
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {data.nombre}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {data.descripcion}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {data.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {data.fecha.toDate().toLocaleString()}
                                        </td>
                                        
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CardCotizaciones.defaultProps = {
    color: "light",
};

CardCotizaciones.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};


export default CardCotizaciones;