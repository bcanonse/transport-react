import { createDoc } from "firebase/firebase";
import React from "react";
import AlertPopper from "components/Alerts/AlertPopper";
import { useHistory } from "react-router-dom";

import { v4 as uuid } from 'uuid';




const CardRegisterVendedor = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const navigate = useHistory();

    const STATE_INITIAL = {
        id: uuid(),
        id_negocio: negocio.codigo,
        nombre: '',
        direccion: '',
        email: ''
    }

    const [vendedor, setVendedor] = React.useState(STATE_INITIAL);
    const [errorOrOk, setErrorOrOk] = React.useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorOrOk("");
        try {
            const response = await createDoc("vendedores", vendedor);
            if (response && response.id.length > 0) {
                setVendedor(STATE_INITIAL);
                setErrorOrOk("Vendedor creado");
                navigate.push('/app/vendors')
            }

        } catch (error) {
            setErrorOrOk("Error al crear vendedor");
        }
    }


    const handleChange = (evt) => {
        setVendedor({
            ...vendedor,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Vendedor</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n de vendedor
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
                                        value={vendedor.nombre}
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
                                        Direcci&oacute;n
                                    </label>
                                    <input
                                        name="direccion"
                                        value={vendedor.direccion}
                                        type="text"
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
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={vendedor.email}
                                        type="email"
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <button
                            disabled={!vendedor.nombre || !vendedor.email}
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

export default CardRegisterVendedor;