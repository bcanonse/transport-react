import FooterSite from 'components/Footers/FooterSite';
import NavbarSite from 'components/Navbars/NavBarSite';
import React from 'react';

import { createDoc } from "firebase/firebase";
import { Timestamp } from "firebase/firestore";

import { InputNumberField } from "components/Inputs/InputNumberField";

import { v4 as uuid } from 'uuid';
import AlertPopper from 'components/Alerts/AlertPopper';
import { useHistory } from 'react-router-dom';

export const PsCeramicsCart = () => {
    const navigate = useHistory();

    const STATE_INITIAL = {
        id: uuid(),
        fecha: Timestamp.fromDate(new Date()),
        descripcion: '',
        id_negocio: 6,
        nombre: '',
        nit: '',
        detalle: [{}]
    }

    let detalleStorage = sessionStorage.getItem("detalle");
    detalleStorage = JSON.parse(detalleStorage);

    const [pedido, setPedido] = React.useState(STATE_INITIAL);
    const [detalle, setDetalle] = React.useState(detalleStorage ?? []);
    const [errorOrOk, setErrorOrOk] = React.useState("");

    const handleChange = (evt) => {
        setPedido({
            ...pedido,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        pedido.detalle = detalle
        try {
            const response = await createDoc("pedidos_externos", pedido);
            if (response && response.id.length > 0) {
                setPedido(STATE_INITIAL);
                setDetalle([]);
                setErrorOrOk("Pedido interno creado");
                sessionStorage.removeItem("detalle");
            }

        } catch (error) {
            setErrorOrOk("Error al crear pedido interno");
        }
    }

    const handleClickDelete = (data, evt) => {
        evt.preventDefault();
        if (detalle) {
            const newDetalle = [...detalle];
            newDetalle.splice(data, 1);
            setDetalle(newDetalle);
            sessionStorage.removeItem("detalle");
            sessionStorage.setItem("detalle", JSON.stringify(newDetalle));
        }
    }

    const handleChangeItems = (index, data, event) => {
        let items = [...detalle]
        items[index][event.target.name] = event.target.value
        setDetalle(items)
        sessionStorage.removeItem("detalle");
        sessionStorage.setItem("detalle", JSON.stringify(detalle));

    }

    return (
        <>
            <NavbarSite />
            <main>
                {/* Form quote */}
                <section className="relative block bg-blueGray-800">
                    <div className="container mx-auto px-4 pt-24">
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="text-4xl mb-4 font-semibold text-white">
                                    Realizar pedido en línea
                                </h2>
                                <p className="text-lg leading-relaxed mt-4 text-blueGray-400">
                                    Debe de ingresar los datos que se piden para poder realizar el pedido en línea.
                                </p>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigate.push('/business/ceramics');
                                    }}
                                    className="bg-blueGray-200 mt-4 text-blueGray-500 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                >
                                    <span className='text-blueGray-500 mr-2'>
                                        <i className="fas fa-arrow-left"></i>
                                    </span>
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Form */}
                <section className="relative flex flex-col text-center justify-center w-full mb-6 bg-blueGray-800">
                    <div className="container mx-auto px-4">
                        <div className="mb-0 px-6 py-6">
                            {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold">
                                    Informaci&oacute;n de tu pedido
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block text-white text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                name="nombre"
                                                value={pedido.nombre}
                                                onChange={handleChange}
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block text-white text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                NIT
                                            </label>
                                            <input
                                                name="nit"
                                                value={pedido.nit}
                                                onChange={handleChange}
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block text-white text-xs font-bold mb-2"
                                                htmlFor="descripcion"
                                            >
                                                Descripci&oacute;n
                                            </label>
                                            <textarea
                                                name="descripcion"
                                                rows={4}
                                                cols={80}
                                                value={pedido.descripcion}
                                                onChange={handleChange}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
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

                                                                    </th>
                                                                    <th
                                                                        className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                    >
                                                                        Cantidad
                                                                    </th>
                                                                    <th
                                                                        className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                    >
                                                                        Precio
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {detalle.map((data, key) => {
                                                                    return (<tr className="" role="row" key={key}>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                            <img
                                                                                alt={data.nombre}
                                                                                src={data.url}
                                                                                className="w-24 h-24 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                                                            />
                                                                        </td>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                            {data.nombre}
                                                                        </td>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                            <InputNumberField
                                                                                name="cantidad"
                                                                                value={data.cantidad}
                                                                                onChange={handleChangeItems.bind(this, key, data)}
                                                                            />
                                                                        </td>
                                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                            Precio: Q. {data.precio}
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
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold">
                                    Total de &iacute;tems: Q. {
                                        detalle.reduce(
                                            (previousValue, currentValue) => previousValue + parseFloat(currentValue.cantidad),
                                            0
                                        )
                                    }
                                </h6>
                                <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold">
                                    Total de precio: Q. {
                                        detalle.reduce(
                                            (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad) * parseFloat(currentValue.precio)),
                                            0
                                        )
                                    }
                                </h6>
                                <button
                                    disabled={!detalle.length > 0 || !pedido.nombre || !pedido.nit || !pedido.descripcion}
                                    className="bg-blueGray-200 text-blueGray-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                >
                                    Comprar
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSite />
        </>
    )
}