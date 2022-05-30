import React from "react";

import { Listbox } from '@headlessui/react';
import { getCollections } from "firebase/firebase";

import { filterDoc } from "firebase/firebase";


const format = new Intl.NumberFormat('en-US');

export const TableFacturaClienteNegocio = ({ facturas }) => {
    const [loading, setLoading] = React.useState(true);
    const [clientes, setClientes] = React.useState([{
        id: '',
        nombre: 'Cliente'
    }]);
    const [negocios, setNegocios] = React.useState([{
        codigo: '',
        nombre: 'Negocio'
    }]);

    const [selectedNegocio, setSelectedNegocio] = React.useState(negocios[0]);
    const [selectedCliente, setSelectedCliente] = React.useState(clientes[0]);
    const [facturasFilter, setFacturasFilter] = React.useState([]);

    const getNegocios = async () => {

        const tNegocios = [];
        const response = await getCollections("negocios");
        response.forEach((value) => {
            tNegocios.push(value.data());
        });
        setLoading(false)
        setNegocios(tNegocios);
    }


    const getClientes = async (id) => {
        const values = [];
        const response = await filterDoc(id, "clientes", "id_negocio");
        response.forEach((value) => {
            values.push(value.data());
        });

        setLoading(false);
        setClientes(values);
    }

    const handleChangeNegocio = (data) => {
        getClientes(data.codigo)
        setSelectedNegocio(data);
        setFacturasFilter([]);
        setSelectedCliente({
            id: '',
            nombre: 'Cliente'
        });
    }


    const handleChangeCliente = (data) => {
        setSelectedCliente(data);
        if (selectedCliente.id) {
            const invoices = facturas.filter((value) => {
                return value.id_cliente === data.id;
            });
            setFacturasFilter(invoices);
        }

    }

    function getListNegocios() {
        if (negocios.length > 0) {
            return (
                <div className="border-0 px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedNegocio.nombre} onChange={handleChangeNegocio}>
                        <Listbox.Button className="w-full text-left">{selectedNegocio.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {negocios.map((option, index) => {
                                return (
                                    <Listbox.Option
                                        key={index}
                                        value={option}
                                        className="w-full"
                                    >
                                        {option.nombre}
                                    </Listbox.Option>
                                );
                            })}
                        </Listbox.Options>
                    </Listbox>
                </div>
            );
        }
    }

    function getListClientes() {
        if (clientes.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedCliente.nombre} onChange={handleChangeCliente}>
                        <Listbox.Button className="w-full text-left">{selectedCliente.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {clientes.map((option, index) => {
                                return (
                                    <Listbox.Option
                                        key={index}
                                        value={option}
                                        className="w-full"
                                    >
                                        {option.nombre}
                                    </Listbox.Option>
                                );
                            })}
                        </Listbox.Options>
                    </Listbox>
                </div>
            );
        }
    }

    React.useEffect(() => {
        getNegocios();
    }, [])

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="w-full px-4 flex-grow flex">
                                    <div className="w-1/2 text-left">
                                        <h3
                                            className="font-semibold text-lg text-white"
                                        >
                                            Facturas por cliente y su respectivo negocio
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div
                            >
                                {getListNegocios()}
                            </div>

                            <div
                            >
                                {getListClientes()}
                            </div>

                        </div>

                        <div className={"block w-full overflow-x-auto " +
                            (loading ? "animate-pulse" : "")
                        }>
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
                                            Cliente
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Total de &iacute;tems
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturasFilter.map((data, key) => {
                                        return (<tr className="cursor-pointer" role="row" key={key}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.fecha}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.descripcion}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.cliente ? data.cliente.nombre : ''}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.detalle.reduce(
                                                    (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad)),
                                                    0
                                                )}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                {format.format(data.detalle.reduce(
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