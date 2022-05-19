import { createDoc, getCollections } from "firebase/firebase";
import React from "react";
import AlertPopper from "components/Alerts/AlertPopper";
import { useHistory } from "react-router-dom";
import { Listbox } from '@headlessui/react';
import { useLocation } from "react-router-dom";


const CardRegisterPermissions = () => {
    const navigate = useHistory();
    const location = useLocation();
    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [negocios, setNegocios] = React.useState([{
        codigo: 0,
        nombre: 'Negocio'
    }])
    const [selectedNegocio, setSelectNegocio] = React.useState(negocios[0]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorOrOk("");
        try {
            const accesoUsuario = {
                id_usuario: location.state.id,
                id_negocio: selectedNegocio.codigo
            };
            const response = await createDoc("acceso_usuarios", accesoUsuario);

            if (response && response.id.length > 0) {
                setErrorOrOk("Acceso otorgado");
                navigate.push({
                    pathname: '/admin/users/permissions',
                    state: { userNegocio: location.state }
                })
            }

        } catch (error) {
            setErrorOrOk("Error al otorgar permiso");
        }
    }

    const getNegocio = async () => {
        const values = [];
        const response = await getCollections("negocios");
        response.forEach((value) => {
            values.push(value.data())
        })
        setNegocios(values);
        setErrorOrOk("")
    }

    function getUsers() {
        if (negocios.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedNegocio} onChange={setSelectNegocio}>
                        <Listbox.Button>{selectedNegocio.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {negocios.map((option) => (
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



    React.useEffect(() => {
        getNegocio()
    }, [])


    return (
        <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Seleccione un negocio para asignar permiso</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n de negocio
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Negocio
                                    </label>
                                    {getUsers()}
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <button
                            disabled={!selectedNegocio.codigo > 0}
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

export default CardRegisterPermissions;