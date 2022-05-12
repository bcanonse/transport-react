import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import Alert from "../Alerts/Alert";
import { useHistory } from "react-router-dom";
import { createDoc } from "../../firebase/firebase";
import { Timestamp } from "firebase/firestore";


const FormQuote = ({ company }) => {
    const history = useHistory();
    const INITIAL_STATE = {
        uid: uuid(),
        datetime: Timestamp.fromDate(new Date()),
        corp: company,
        name: '',
        email: '',
        description: ''
    }
    const [values, setValues] = useState(INITIAL_STATE)

    const [errorOrResponse, setErrorOrResponse] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (values.name.length > 0 &&
            values.email.length > 0 &&
            values.description.length > 0
        ) {
            const response = await createDoc("cotizacion", values);
            if (!response || !response?.id) setErrorOrResponse("Error al crear cotizacion")
            if (response && response?.id.length > 0) {
                setValues(INITIAL_STATE)
                setErrorOrResponse("Solicitud recibida, se dará seguimiento de nuestro parte");
                history.push('/');
            }
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
                {errorOrResponse && <Alert message={errorOrResponse} />}
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
                        name="name"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nombre completo"
                        onChange={handleChange}
                        value={values.name}
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
                        name="description"
                        rows={4}
                        cols={80}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Escribe un mensaje..."
                        onChange={handleChange}
                        value={values.description}
                    />
                </div>
                <div className="text-center mt-6">
                    <button
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