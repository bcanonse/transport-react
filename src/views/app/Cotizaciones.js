import React from "react";
import { useHistory } from "react-router-dom";

import { filterDoc, deleteCustomDoc } from "firebase/firebase";

export default function Cotizaciones() {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const [cotizaciones, setCotizaciones] = React.useState([]);

    const getVendedores = async () => {
        const tCotizaciones = [];
        const response = await filterDoc(negocio.codigo, "cotizaciones", "id_negocio");
        response.forEach(element => {
            const data = {
                id: element.id,
                meta: element.data()
            }
            tCotizaciones.push(data);
        });
        setCotizaciones(tCotizaciones);
    }

    const navigate = useHistory();

    const handleClickNavigate = () => {
        navigate.push({
            pathname: '/app/quotes/create'
        });
    }


    const handleClickUpdate = (data, evt) => {
        if (!data.meta.id_vendedor) {
            navigate.push({
                pathname: '/app/quotes/modify',
                state: data
            })
        }
    }

    const handleClickDelete = async (data, evt) => {
        if (data.id) {
            try {
                await deleteCustomDoc("cotizaciones", data.id);
                const newCot = cotizaciones.filter((value) => value.id !== data.id);
                setCotizaciones(newCot);
            } catch (error) {
                console.error(error);
            }

        }
    }



    React.useEffect(() => {
        getVendedores()
    }, []);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="w-full px-4 flex-grow flex">
                                    <div className="w-1/2 text-left">
                                        <h3
                                            className="font-semibold text-lg text-blueGray-700"
                                        >
                                            Cotizaciones
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
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Lo solicita
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Descripci&oacute;n
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Email
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                        >
                                            Fecha y hora de cotizaci&oacute;n
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cotizaciones.map((data, index) => {
                                        return (
                                            <tr
                                                className="cursor-pointer"
                                                key={index}
                                            >
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.meta.nombre}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.meta.descripcion}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.meta.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.meta.fecha.toDate().toLocaleString()}
                                                </td>
                                                <td className="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="bg-rose-500 w-1/2" >
                                                        <button onClick={handleClickUpdate.bind(this, data)} >
                                                            <i className="fas fa-pen text-blue-400"></i>
                                                        </button>
                                                    </div>
                                                    <div className="bg-rose-500 w-1/2" >
                                                        <button onClick={handleClickDelete.bind(this, data)} >
                                                            <i className="fas fa-trash text-red-500"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}