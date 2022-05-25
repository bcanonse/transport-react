import React from 'react';

import { useHistory } from "react-router-dom";

import { filterDoc, deleteCustomDoc } from "firebase/firebase";

export const IngresoInventario = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const navigate = useHistory();

    const [ingresos, setIngresos] = React.useState([]);
    
    const getPedidos = async () => {
        const tPedidos = [];
        const tSucursales = [];
        const response =
            await filterDoc(negocio.codigo, "sucursales", "id_negocio");

        response.forEach(element => {
            tSucursales.push(element.data());
        });

        for (const value of tSucursales) {
            const pedidos =
                await filterDoc(value.id, "ingresos_inventarios", "id_sucursal");
            pedidos.forEach(element => {
                const data = {
                    id: element.id,
                    meta: element.data(),
                    sucursal: value
                }
                tPedidos.push(data);
            })
        }
        setIngresos(tPedidos);
    }

    const handleClickNavigate = () => {
        navigate.push({
            pathname: 'inventory-income/create'
        });
    }

    const handleClickUpdate = (data, evt) => {
        if (data.id) {
            navigate.push({
                pathname: '/app/inventory-income/modify',
                state: data
            })
        }
    }

    const handleClickDelete = async (data, evt) => {
        if (data.id) {
            try {
                await deleteCustomDoc("ingresos_inventarios", data.id);
                const newCot = ingresos.filter((value) => value.id !== data.id);
                setIngresos(newCot);
            } catch (error) {
                console.error(error);
            }

        }
    }

    React.useEffect(() => {
        getPedidos();
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
                                            Ingreso a inventarios
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
                                            Fecha
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Descripci&oacute;n
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Sucursal
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Total de &iacute;tems
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Total de costo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingresos.map((data, key) => {
                                        return (<tr className="cursor-pointer" role="row" key={key}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.fecha}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.descripcion}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.sucursal.nombre}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.meta.detalle.reduce(
                                                    (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad)),
                                                    0
                                                )}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                Q {data.meta.detalle.reduce(
                                                    (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad) * parseFloat(currentValue.costo)),
                                                    0
                                                )}
                                            </td>
                                            <td className="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="w-1/2  hidden" >
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