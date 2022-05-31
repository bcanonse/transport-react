import React from "react";
import { useHistory } from "react-router-dom";

import { getProveedoresService } from "services/proveedores/proveedorService";
import { deleteProveedor } from "services/proveedores/proveedorService";

export const Proveedores = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const [proveedores, setProveedores] = React.useState([]);

    const getClientes = async () => {
        const response = await getProveedoresService(negocio.codigo);
        setProveedores(response);
    };

    const navigate = useHistory();


    React.useEffect(() => {
        getClientes()
    }, []);

    const handleClickNavigate = () => {
        navigate.push({
            pathname: 'manufacturers/create'
        });
    }

    const handleClickUpdate = (data, evt) => {
        if (data.id) {
            navigate.push({
                pathname: '/app/manufacturers/modify',
                state: data
            })
        }
    }

    const handleClickDelete = async (data, evt) => {
        if (data.id) {
            try {
                await deleteProveedor(data.id);
                const newCot = proveedores.filter((value) => value.id !== data.id);
                setProveedores(newCot);
            } catch (error) {
                console.error(error);
            }

        }
    }


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
                                            Proveedores
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
                                            Nombre
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Direcci&oacute;n
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Email
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Nit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proveedores.map((data, key) => {
                                        return (<tr className="cursor-pointer" role="row" key={key}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.nombre}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.direccion}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.email}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.nit}
                                            </td>
                                            <td className="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="w-1/2" >
                                                    <button onClick={handleClickUpdate.bind(this, data)} >
                                                        <i className="fas fa-pen text-blue-400"></i>
                                                    </button>
                                                </div>
                                                <div className="w-1/2 ml-2" >
                                                    <button onClick={handleClickDelete.bind(this, data)} >
                                                        <i className="fas fa-trash text-red-500"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>);
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}