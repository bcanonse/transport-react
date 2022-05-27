import FooterSite from "components/Footers/FooterSite"
import NavbarSite from "components/Navbars/NavBarSite"

import React from 'react';
import AlertPopper from "components/Alerts/AlertPopper";
import { getDocRef } from "firebase/firebase";

export const StatusOrder = () => {
    const [loading, setLoading] = React.useState(false);
    const [errorOrOk, setErrorOrOk] = React.useState("");
    const [token, setToken] = React.useState("");
    const [data, setData] = React.useState(null);

    const handleChange = (evt) => {
        setToken(evt.target.value);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        try {
            const quote = await getDocRef(token, "cotizaciones");
            const order = await getDocRef(token, "pedidos_externos");
            if (quote === undefined && order === undefined) {
                setErrorOrOk("No existe el token");
                setLoading(false);
            }
            if (quote) {
                setData(quote);
                setLoading(false);
            }
            if (order) {
                setData(order);
                setLoading(false);
            }

        } catch (error) {
            setErrorOrOk("Error al consultar información");
        }
    }


    return (
        <>
            <NavbarSite />
            <main>
                <div className={
                    "relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen " +
                    (loading ? "animate-pulse" : "")
                }>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://media.istockphoto.com/photos/oil-and-gas-industry-refinery-at-sunset-factory-picture-id637140248?b=1&k=20&m=637140248&s=170667a&w=0&h=EjEZzD_Z-qATHoBryXqoE5d_M-vS_iJwnpdQYZiibBY=')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-75 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h1 className="text-white font-semibold text-5xl">
                                        B&uacute;squeda de cotizaciones o pedidos en línea
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">
                                        Ingresa el token recibido por correo electr&oacute;nico para ver el estado
                                        de tu pedido o cotizaci&oacute;n realizado
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </div>

                <section className="pb-20 bg-blueGray-200 flex flex-col text-center justify-center w-full">
                    <div className="container mx-auto px-4">
                        <div className="mb-0 px-6 py-6">
                            {errorOrOk && <AlertPopper color="red" message={errorOrOk} />}
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>
                                <h6 className="text-blueGray-500 text-xl mt-3 mb-6 font-bold">
                                    Ingresa el token enviado a tu correo electrónico
                                </h6>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block text-blueGray-500 text-sm font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Token
                                            </label>
                                            <input
                                                name="token"
                                                value={token}
                                                onChange={handleChange}
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <button
                                                disabled={!token}
                                                className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            >
                                                <span className='text-white mr-2'>
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                Buscar
                                            </button>
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
                                                        <p className="text-lg text-blueGray-800 font-medium">{data ? `Estimado: ${data.nombre}` : ''}</p>
                                                        <p className="text-lg text-blueGray-800 font-medium">
                                                            {data ? !data.id_vendedor ? !data.detalle ? 'Su cotización está siendo revisada' : 'El pedido fue recibido exitosamente, será enviado a la dirección proporcionada' : 'Un vendedor se pondra en contacto con usted' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSite />
        </>
    );
}