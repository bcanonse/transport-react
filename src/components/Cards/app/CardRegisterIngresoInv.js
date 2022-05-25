import React from "react";

import { createDoc, filterDoc } from "firebase/firebase";
import { v4 as uuid } from 'uuid';

import { useHistory } from "react-router-dom";
import { Listbox } from '@headlessui/react';

import AlertPopper from "components/Alerts/AlertPopper";
import { InputNumberField } from "components/Inputs/InputNumberField";

import { useAuth } from "context/AuthProvider";
import { Timestamp } from "firebase/firestore";


import { filterInventario, updateAgProductoInventario, updateNuevoProdInv } from "firebase/inventarios";

export const CardRegisterIngresoInv = () => {
    const { user } = useAuth();
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);


    const STATE_INITIAL = {
        id: uuid(),
        fecha: '',
        descripcion: '',
        id_sucursal: '',
        usuario_id: '',
        usuario: '',
        fechaHora: Timestamp.fromDate(new Date()),
        detalle: [{}]
    }

    const [ingresoInv, setIngresoInv] = React.useState(STATE_INITIAL);
    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [sucursales, setSucursales] = React.useState([{
        id: '',
        nombre: 'Sucursal'
    }])

    const [selectedSucursal, setSelectSucursal] = React.useState(sucursales[0]);

    const [detalle, setDetalle] = React.useState([]);

    const [productos, setProductos] = React.useState([{
        id: '',
        nombre: 'Producto',
        cantidad: 0,
        costo: 0,
    }]);
    const [selectedProducto, setSelectProducto] = React.useState(productos[0]);
    

    const handleChangeNegocio = (data) => {
        setSelectSucursal(data)
    }

    const handleClickDelete = (data, evt) => {
        evt.preventDefault();
        if (detalle) {
            const newDetalle = [...detalle];
            newDetalle.splice(data, 1);
            setDetalle(newDetalle);
        }
    }


    const handleAddItem = (event) => {
        event.preventDefault();
        getListProductos();
    }

    const getSucursales = async () => {
        const values = [];
        const response = await filterDoc(negocio.codigo, "sucursales", "id_negocio");
        response.forEach((value) => {
            values.push(value.data())
        })
        setSucursales(values);
        setErrorOrOk("")
    };

    const getListProductos = async () => {
        const values = [];
        const response = await filterDoc(negocio.codigo, "productos", "id_negocio");
        response.forEach((value) => {
            values.push(value.data())
        })
        setProductos(values);
        setErrorOrOk("")
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        ingresoInv.id_sucursal = selectedSucursal.id;
        ingresoInv.detalle = detalle
        ingresoInv.usuario_id = user.uid;
        ingresoInv.usuario = user.email.substring(0, user.email.indexOf('@'));
        try {
            const response = await createDoc("ingresos_inventarios", ingresoInv);
            for (const value of ingresoInv.detalle) {
                const data = {
                    id_sucursal: ingresoInv.id_sucursal,
                    id_producto: value.id,
                    costo: value.costo,
                    cantidad: value.cantidad
                }
                const resInv = await filterInventario(value.id, ingresoInv.id_sucursal);

                if (resInv.docs[0]) {
                    const dataRes = resInv.docs[0].data();
                    dataRes.cantidad = (parseFloat(dataRes.cantidad) + parseFloat(value.cantidad)).toString();
                    dataRes.costo = (parseFloat(value.costo)).toString();
                    await updateAgProductoInventario(resInv.docs[0].id, dataRes);
                } else {
                    const idResponse = await createDoc("inventarios", data);
                    await updateNuevoProdInv(idResponse.id, data);
                    
                }
            }

            if (response && response.id.length > 0) {
                setIngresoInv(STATE_INITIAL);
                setErrorOrOk("Pedido interno creado");
                navigate.push('/app/inventory-income');
            }

        } catch (error) {
            setErrorOrOk("Error al crear ingreso a inventario");
        }
    }

    function getListSucursales() {
        if (sucursales.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox value={selectedSucursal} onChange={handleChangeNegocio}>
                        <Listbox.Button>{selectedSucursal.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {sucursales.map((option, index) => {
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

    const handleChangeProducto = (data) => {
        setSelectProducto(data);
        const { id, nombre: producto, costo } = data;

        setDetalle([
            ...detalle,
            {
                id,
                producto,
                cantidad: 0.00,
                costo: costo,
            }
        ])
    }

    function getProductos() {
        if (productos.length > 0) {
            return (
                <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    <Listbox onChange={handleChangeProducto}>
                        <Listbox.Button className="w-full text-left">{selectedProducto.nombre}</Listbox.Button>
                        <Listbox.Options>
                            {productos.map((option, index) => {
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

    const navigate = useHistory();

    const handleChange = (evt) => {
        setIngresoInv({
            ...ingresoInv,
            [evt.target.name]: evt.target.value
        })
    }

    const handleChangeItems = (index, data, event) => {
        let items = [...detalle]
        items[index][event.target.name] = event.target.value
        setDetalle(items)

    }

    React.useEffect(() => {
        getSucursales()
    }, [])


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Ingreso de inventario</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Informaci&oacute;n del ingreso de inventario
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Sucursales
                                    </label>
                                    {getListSucursales()}
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
                                        value={ingresoInv.fecha}
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
                                        htmlFor="descripcion"
                                    >
                                        Descripci&oacute;n
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        rows={4}
                                        cols={80}
                                        value={ingresoInv.descripcion}
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Agregar productos
                        </h6>

                        <div
                            onClick={handleAddItem}>
                            {getProductos()}
                        </div>

                        {/* Listado */}
                        <div className="flex flex-wrap mt-6">


                            <div className="w-full px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                                >
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        <div className="flex flex-wrap items-center">
                                            <div className="block w-full overflow-x-auto">

                                                <table className="items-center w-full bg-transparent border-collapse">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            >
                                                                Producto
                                                            </th>
                                                            <th
                                                                className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            >
                                                                Cantidad
                                                            </th>
                                                            <th
                                                                className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            >
                                                                Costo
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {detalle.map((data, key) => {
                                                            return (<tr className="" role="row" key={key}>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    {data.producto}
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <InputNumberField
                                                                        name="cantidad"
                                                                        value={data.cantidad}
                                                                        onChange={handleChangeItems.bind(this, key, data)}
                                                                    />
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                    <InputNumberField
                                                                        name="costo"
                                                                        value={data.costo}
                                                                        onChange={handleChangeItems.bind(this, key, data)}
                                                                    />
                                                                </td>
                                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap p-4">
                                                                    <button onClick={handleClickDelete.bind(this, key)} >
                                                                        <i className="fas fa-trash text-red-500"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>);
                                                        })
                                                        }
                                                    </tbody>
                                                </table>

                                                <h6 className="text-blueGray-400 px-6 text-sm mt-3 mb-6 font-bold">
                                                    Total de &iacute;tems: Q. {
                                                        detalle.reduce(
                                                            (previousValue, currentValue) => previousValue + parseFloat(currentValue.cantidad),
                                                            0
                                                        )
                                                    }
                                                </h6>
                                                <h6 className="text-blueGray-400 text-sm px-6 mt-3 mb-6 font-bold">
                                                    Total de costos: Q. {
                                                        detalle.reduce(
                                                            (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad) * parseFloat(currentValue.costo)),
                                                            0
                                                        )
                                                    }
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <button
                            disabled={!ingresoInv.fecha || !selectedSucursal.id || !detalle.length > 0}
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