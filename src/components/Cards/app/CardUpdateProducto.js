import React from 'react';

import AlertPopper from "components/Alerts/AlertPopper";
import { Listbox } from '@headlessui/react';

import { updateCustomDoc, filterDoc } from "firebase/firebase";
import { useHistory, useLocation } from "react-router-dom";
import { InputNumberField } from "components/Inputs/InputNumberField";
import { getImageUrl } from 'firebase/firebase';

const listTipoProduct = ["Materia prima", "Producto terminado"];

export const CardUpdateProducto = () => {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const navigate = useHistory();
    const location = useLocation();
    const dataArg = location.state;

    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [producto, setProducto] = React.useState(dataArg.meta);

    const [selectedTipoP, setSelectedTipoP] = React.useState(dataArg.meta.tipoProducto);
    const [checked, setChecked] = React.useState(dataArg.meta.estado);
    const [proveedores, setProveedores] = React.useState([{
        id: '',
        nombre: 'Proveedor'
    }]);

    const [selectedProveedor, setSelectedProveedor] = React.useState(proveedores[0]);

    const [file, setFile] = React.useState(null);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorOrOk("");
        producto.tipoProducto = selectedTipoP;
        producto.proveedor = selectedProveedor.id;
        try {
            await updateCustomDoc("productos", dataArg.id, producto);
            setProducto(dataArg.meta);
            setErrorOrOk("Producto actualizado");
            navigate.push('/app/products')
        } catch (error) {
            setErrorOrOk("Error al actualizar producto");
        }
    }



    const handleChange = (evt) => {
        setProducto({
            ...producto,
            [evt.target.name]: evt.target.value
        })
    }

    const getProveedores = async () => {
        const values = []
        const response = await filterDoc(negocio.codigo, "proveedores", "id_negocio");
        response.forEach((value) => {
            const { id: idProveedor, nombre } = value.data();
            if (idProveedor === dataArg.meta.proveedor) {
                setSelectedProveedor({
                    id: idProveedor,
                    nombre
                });
            }
            values.push(value.data())
        })
        const url = await getImageUrl(producto.imagen);
        setFile(url);
        setProveedores(values);
        setErrorOrOk("")
    }

    const handleChangeTipoP = (data) => {
        setSelectedTipoP(data)
    }

    const handleChangeProveedor = (data) => {
        setSelectedProveedor(data);
    }

    const handleCheckboxChange = () => {
        setChecked(!checked);
    }

    const getTipoProductos = () => {
        return (
            <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <Listbox value={selectedTipoP} onChange={handleChangeTipoP}>
                    <Listbox.Button>{selectedTipoP}</Listbox.Button>
                    <Listbox.Options>
                        {listTipoProduct.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option}
                                className="w-full"
                            >
                                {option}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>
        );
    }


    const getTipoProveedores = () => {
        return (
            <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <Listbox value={selectedProveedor} onChange={handleChangeProveedor}>
                    <Listbox.Button>{selectedProveedor.nombre}</Listbox.Button>
                    <Listbox.Options>
                        {proveedores.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option}
                                className="w-full"
                            >
                                {option.nombre}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>
        );
    }

    React.useEffect(() => {
        getProveedores()
    }, [])

    return (
        <>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Producto</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n del producto
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
                                        value={producto.nombre}
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
                                        Tipo de producto
                                    </label>
                                    {getTipoProductos()}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Imagen
                                        <img
                                            src={file}
                                            className="w-32 h-32 object-contain rounded-2xl shadow-lg mb-6"
                                        />

                                    </label>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Proveedor
                                    </label>
                                    {getTipoProveedores()}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        SKU
                                    </label>
                                    <input
                                        name="sku"
                                        value={producto.sku}
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
                                        Costo
                                    </label>
                                    <InputNumberField
                                        name="costo"
                                        value={producto.costo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Cantidad
                                    </label>
                                    <InputNumberField
                                        name="cantidad"
                                        value={producto.cantidad}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Activo
                                    </label>
                                    <input
                                        name="estado"
                                        checked={checked}
                                        type="checkbox"
                                        onChange={handleCheckboxChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <button
                            disabled={!producto.nombre || !producto.costo || !producto.cantidad || !selectedTipoP || !selectedProveedor.id}
                            className="bg-lightBlue-500 mt-6 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}