import { createDoc } from "firebase/firebase";
import React from "react";
import AlertPopper from "components/Alerts/AlertPopper";
import { useHistory } from "react-router-dom";
import { Listbox } from '@headlessui/react';
import { Timestamp } from "firebase/firestore";

import { v4 as uuid } from 'uuid';
import { filterDoc } from "firebase/firebase";


const CardRegisterCotizacion = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);


    const STATE_INITIAL = {
        id: uuid(),
        fecha: Timestamp.fromDate(new Date()),
        id_negocio: negocio.codigo,
        nombre: '',
        email: '',
        descripcion: '',
        esGenerica: false,
        id_vendedor: ''
    }

    const [cotizacion, setCotizacion] = React.useState(STATE_INITIAL);
    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [vendedores, setVendedores] = React.useState([{
        id: '',
        nombre: 'Vendedor'
    }])
    const [selectedVendedor, setSelectVendedor] = React.useState(vendedores[0]);

    const handleChangeVendedor = (data) => {
        setSelectVendedor(data)
    }

    const getVendedor = async () => {
        const values = [];
        const response = await filterDoc(negocio.codigo, "vendedores", "id_negocio");
        response.forEach((value) => {
            values.push(value.data())
        })
        setVendedores(values);
        setErrorOrOk("")
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        cotizacion.id_vendedor = selectedVendedor.id;
        setErrorOrOk("");
        try {
            const response = await createDoc("cotizaciones", cotizacion);
            if (response && response.id.length > 0) {
                setCotizacion(STATE_INITIAL);
                setErrorOrOk("Cotización creada");
                navigate.push('/app/quotes')
            }

        } catch (error) {
            setErrorOrOk("Error al crear cotización");
        }
    }

    function getUsers() {
        if (vendedores.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedVendedor} onChange={handleChangeVendedor}>
                        <Listbox.Button>{selectedVendedor.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {vendedores.map((option) => (
                                <Listbox.Option
                                    key={option.codigo}
                                    value={option}
                                    className="w-full"
                                >
                                    {option.nombre}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
            )
        }
    }

    const navigate = useHistory();

    const handleChange = (evt) => {
        setCotizacion({
            ...cotizacion,
            [evt.target.name]: evt.target.value
        })
    }

    React.useEffect(() => {
        getVendedor()
    }, [])


    return (
        <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Cotizaci&oacute;n</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n de cotizaci&oacute;n
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        name="nombre"
                                        value={cotizacion.nombre}
                                        onChange={handleChange}
                                        type="text"
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
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={cotizacion.email}
                                        type="email"
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
                                    {getUsers()}
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
                                        value={cotizacion.descripcion}
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <button
                            disabled={!cotizacion.nombre || !cotizacion.email || !selectedVendedor.id}
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

export default CardRegisterCotizacion;