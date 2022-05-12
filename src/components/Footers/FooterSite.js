import { Link } from "react-router-dom";

const FooterSite = () => {
    return (
        <>
            <footer className="relative bg-blueGray-200 pt-8 pb-6">
                <div
                    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold">Calidad garantizada</h4>
                            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                                Visita cada p&aacute;gina para conocer sobre cada giro de negocio.
                                Hazlo con tan solo un click!
                            </h5>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top mb-6">
                                <div className="w-full lg:w-4/12 px-4 ml-auto py-4">
                                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                                        Negocios de transporte
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/transport-mp'
                                            >
                                                Transporte materia prima
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/export-mp'
                                            >
                                                Exportaci&oacute;n materia prima
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 py-4">
                                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                                        Negocios de construcci&oacute;n
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/build'
                                            >
                                                Construcci&oacute;n en general
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/build-machines'
                                            >
                                                Maquinaria de construcci&oacute;n
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 py-4">
                                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                                        Negocios de plantas industriales
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/mining-extraction'
                                            >
                                                Plantas de extracci&oacute;n minera
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                to='/business/ceramics'
                                            >
                                                Plantas de MP para cer&aacute;micos
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-blueGray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Copyright © {new Date().getFullYear()} Transport Corporation
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterSite;