import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import Alert from "../Alerts/Alert";
import { createDoc } from "../../firebase/firebase";
import { Timestamp } from "firebase/firestore";
import AlertPopper from "components/Alerts/AlertPopper";


const FormQuote = ({ company }) => {
    const INITIAL_STATE = {
        id: uuid(),
        fecha: Timestamp.fromDate(new Date()),
        id_negocio: company,
        nombre: '',
        email: '',
        descripcion: '',
        esGenerica: true,
    }
    const [values, setValues] = useState(INITIAL_STATE)

    const [errorOrResponse, setErrorOrResponse] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await createDoc("cotizaciones", values);
            if (!response || !response?.id) setErrorOrResponse("Error al crear cotizacion")
            if (response && response?.id.length > 0) {
                setValues(INITIAL_STATE)
                setErrorOrResponse(
                    `Solicitud recibida exitosamente, este es el token para ver el estado de su solicitud ${response.id}`
                );
            }
        } catch (error) {
            setErrorOrResponse("Error al enviar solicitud, intente más tarde");
        }

    }

    const handleChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                {errorOrResponse && <AlertPopper color="red" message={errorOrResponse} />}
                <h4 className="text-2xl font-semibold">
                    Necesitas una cotización de nuestro servicio
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                    Completa este formulario y nos pondremos en contacto contigo en menos de 24 horas
                </p>
                <div className="relative w-full mb-3 mt-8">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                    >
                        Nombre completo
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nombre completo"
                        onChange={handleChange}
                        value={values.nombre}
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                    />
                </div>

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
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Escribe un mensaje..."
                        onChange={handleChange}
                        value={values.descripcion}
                    />
                </div>
                <div className="text-center mt-6">
                    <button
                        disabled={!values.nombre || !values.email || !values.descripcion}
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                        Enviar mensaje
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormQuote;