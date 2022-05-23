import React from 'react';

import AlertPopper from "components/Alerts/AlertPopper";
import { Listbox } from '@headlessui/react';

import { updateCustomDoc, filterDoc } from "firebase/firebase";
import { useHistory, useLocation } from "react-router-dom";
import { InputNumberField } from "components/Inputs/InputNumberField";

const tiposServicios = ["Exportación", "Transporte", "Alquiler"]

export const CardUpdateServicio = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const navigate = useHistory();
    const location = useLocation();
    const dataArg = location.state;

    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [servicio, setServicio] = React.useState(dataArg.meta);


    const [clientes, setClientes] = React.useState([{
        id: '',
        nombre: 'Cliente'
    }])
    const [vendedores, setVendedores] = React.useState([{
        id: '',
        nombre: 'Vendedor'
    }])

    const [selectedCliente, setSelectCliente] = React.useState(clientes[0]);
    const [selectedVendedor, setSelectVendedor] = React.useState(vendedores[0]);
    const [selectedTipoServicio, setSelectTipoServicio] = React.useState(dataArg.meta.tipoServicio);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorOrOk("");
        servicio.id_cliente = selectedCliente.id;
        servicio.tipoServicio = selectedTipoServicio;
        servicio.id_vendedor = selectedVendedor.id;
        try {
            await updateCustomDoc("servicios", dataArg.id, servicio);
            setServicio(dataArg.meta);
            setErrorOrOk("Servicio actualizado");
            navigate.push('/app/services')
        } catch (error) {
            setErrorOrOk("Error al actualizar servicio");
        }
    }

    const handleChange = (evt) => {
        setServicio({
            ...servicio,
            [evt.target.name]: evt.target.value
        })
    }

    const handleChangeCliente = (data) => {
        setSelectCliente(data)
    }

    const handleChangeVendedor = (data) => {
        setSelectVendedor(data)
    }


    const handleChangeTServicio = (data) => {
        setSelectTipoServicio(data)
    }

    const getVendedores = async () => {
        const values = [];
        const response = await filterDoc(negocio.codigo, "vendedores", "id_negocio");
        response.forEach((value) => {
            const {id: idVendedor, nombre} = value.data();
            if (idVendedor === dataArg.meta.id_vendedor) {
                setSelectVendedor({
                    id: idVendedor,
                    nombre
                });
            }
            values.push(value.data())
        })
        setVendedores(values);
        setErrorOrOk("")
    }

    const getClientes = async () => {
        const values = [];
        const response = await filterDoc(negocio.codigo, "clientes", "id_negocio");
        response.forEach((value) => {
            const {id: idCliente, nombre} = value.data();
            if (idCliente === dataArg.meta.id_cliente) {
                setSelectCliente({
                    id: idCliente,
                    nombre
                });
            }
            values.push(value.data())
        })
        setClientes(values);
        setErrorOrOk("")
    };

    function getListClients() {
        if (clientes.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedCliente} onChange={handleChangeCliente}>
                        <Listbox.Button>{selectedCliente.nombre}</Listbox.Button>
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
            )
        }
    }

    function getListVendedores() {
        if (vendedores.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedVendedor} onChange={handleChangeVendedor}>
                        <Listbox.Button>{selectedVendedor.nombre}</Listbox.Button>
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
            )
        }
    }


    
    function getTipoServicios() {
        return (
            <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <Listbox value={selectedTipoServicio} onChange={handleChangeTServicio}>
                    <Listbox.Button>{selectedTipoServicio}</Listbox.Button>
                    <Listbox.Options>
                        {tiposServicios.map((option, index) => {
                            return (
                                <Listbox.Option
                                    key={index}
                                    value={option}
                                    className="w-full"
                                >
                                    {option}
                                </Listbox.Option>
                            );
                        })}
                    </Listbox.Options>
                </Listbox>
            </div>
        )
    }

    React.useEffect(() => {
        getClientes()
        getVendedores()
    }, [])

    return (
        <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Servicio</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n del servicio
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Cliente
                                    </label>
                                    {getListClients()}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Fecha
                                    </label>
                                    <input
                                        name="fecha"
                                        value={servicio.fecha}
                                        type="date"
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Vendedor
                                    </label>
                                    {getListVendedores()}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Tipo de servicio
                                    </label>
                                    {getTipoServicios()}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="descripcion"
                                    >
                                        Descripci&oacute;n
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        rows={4}
                                        cols={80}
                                        value={servicio.descripcion}
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Total
                                    </label>
                                    <InputNumberField
                                        name="total"
                                        value={servicio.total}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <button
                            disabled={!servicio.total || !servicio.fecha || !selectedCliente.id || !selectedTipoServicio || !selectedVendedor.id}
                            className="bg-lightBlue-500 mt-6 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}