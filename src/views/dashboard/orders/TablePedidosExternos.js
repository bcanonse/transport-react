import React from "react";

const format = new Intl.NumberFormat('en-US');

export const TablePedidosExternos = ({ pedidos }) => {

    return (
        <>
            <div className="flex flex-wrap mt-4">
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
                                            Pedidos en l&iacute;nea
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
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            NIT
                                        </th>
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
                                            Total &iacute;tems
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map((data, key) => {
                                        return (<tr className="cursor-pointer" role="row" key={key}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.nombre}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.nit}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.fecha.toDate().toLocaleString()}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.descripcion}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.detalle.reduce(
                                                    (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad)),
                                                    0
                                                )}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                Q {format.format(data.detalle.reduce(
                                                    (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad) * parseFloat(currentValue.precio)),
                                                    0
                                                ))}
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
    )
}