import React from "react";

import { filterDoc } from "firebase/firebase";

import { Listbox } from '@headlessui/react';
import { getCollections } from "firebase/firebase";

export const TableCotizacionVendedor = ({ cotizaciones }) => {

    const [loading, setLoading] = React.useState(true);
    const [vendedores, setVendedores] = React.useState([{
        id: '',
        nombre: 'Vendedor'
    }]);
    const [negocios, setNegocios] = React.useState([{
        codigo: '',
        nombre: 'Negocio'
    }]);

    const [selectedNegocio, setSelectedNegocio] = React.useState(negocios[0]);
    const [selectedVendedor, setSelectedVendedor] = React.useState(vendedores[0]);
    const [cotizacionesFilter, setCotizacionesFilter] = React.useState([]);

    const getNegocios = async () => {

        const tNegocios = [];
        const response = await getCollections("negocios");
        response.forEach((value) => {
            tNegocios.push(value.data());
        });
        setLoading(false)
        setNegocios(tNegocios);
    }


    const getVendedores = async (id) => {
        const values = [];
        const response = await filterDoc(id, "vendedores", "id_negocio");
        response.forEach((value) => {
            values.push(value.data());
        });

        setLoading(false);
        setVendedores(values);
    }

    const handleChangeNegocio = (data) => {
        getVendedores(data.codigo)
        setSelectedNegocio(data);
        setCotizacionesFilter([]);
        setSelectedVendedor({
            id: '',
            nombre: 'Vendedor'
        });
    }


    const handleChangeVendedor = (data) => {
        setSelectedVendedor(data);
        if (selectedVendedor.id) {
            const quotes = cotizaciones.filter((value) => {
                return value.id_vendedor === data.id;
            });
            setCotizacionesFilter(quotes);
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

    function getListVendedores() {
        if (vendedores.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedVendedor.nombre} onChange={handleChangeVendedor}>
                        <Listbox.Button className="w-full text-left">{selectedVendedor.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {vendedores.map((option, index) => {
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
                                            Cotizaciones por vendedor y su respectivo negocio
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
                                {getListVendedores()}
                            </div>

                        </div>
                        
                        <div className={"block w-full overflow-x-auto " +
                            (loading ? "animate-pulse" : "")
                        }>
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                                        >
                                            Descripci&oacute;n
                                        </th>
                                        <th
                                            className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cotizacionesFilter.map((data, key) => {
                                        return (<tr className="cursor-pointer" role="row" key={key}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.nombre}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.fecha.toDate().toLocaleString()}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.descripcion}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {data.total}
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