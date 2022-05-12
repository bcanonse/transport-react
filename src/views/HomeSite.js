import { Link } from "react-router-dom";
import FooterSite from "../components/Footers/FooterSite";
import NavbarSite from "../components/Navbars/NavBarSite";


const HomeSite = () => {
    return (
        <>
            <NavbarSite />
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
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
                                        Corporaci&oacute;n Transport
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">
                                        Corporaci&oacute;n Transport cuenta con varios giros de
                                        negocio que brindan servicios y venta de art&iacute;culos
                                        de construcci&oacute;n de alta calidad teniendo clientes a
                                        nivel nacional e internacional.

                                        Conoce m&aacute;s de nuestros productos, servicios y alquileres que brindan
                                        Transport y cont&aacute;ctanos para apoyarte en lo que necesites.
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

                <section className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">

                            <Link
                                className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
                                to="/business/transport-mp"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="data:image/jpeg;base64,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"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />
                                        <h6 className="text-xl font-semibold">Transporte de MP</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Transporte de materia prima para diferentes empresas.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                className="w-full md:w-4/12 px-4 text-center"
                                to="/business/export-mp"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BIVELYKmE3pV4fFKoaIHp7rU9peoNPcdlQ&usqp=CAU"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />

                                        <h6 className="text-xl font-semibold">Exportaci&oacute;n materia prima</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Transporte de productos para empresas extranjeras y
                                            nacionales, inter puertos, inter fronteras,
                                            de puerto a bodegas y de bodegas a puertos.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                className="pt-6 w-full md:w-4/12 px-4 text-center"
                                to="/business/build"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="data:image/jpeg;base64,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"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />
                                        <h6 className="text-xl font-semibold">Construcci&oacute;n en general</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Servicios de Construcción en general, como puentes, carreteras y edificios.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
                                to="/business/build-machines"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="https://www.schaeffler.cn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/47425_header-schaeffler-industry-solutions-offroad-construction-machinery_rwd_1200.jpg"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />
                                        <h6 className="text-xl font-semibold">Maquinaria de construcci&oacute;n</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Venta y alquiler de maquinaria de construcción, con sucursales en Guatemala
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                className="w-full md:w-4/12 px-4 text-center"
                                to="/business/mining-extraction"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="https://economia.org/anexo/Explotacion-minera-380x273.jpg"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />
                                        <h6 className="text-xl font-semibold">Plantas de extracci&oacute;n minera</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Plantas de extracción minera en Guatemala.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                className="pt-6 w-full md:w-4/12 px-4 text-center"
                                to="/business/ceramics"
                            >
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <img
                                            alt="..."
                                            src="https://decortips.com/es/wp-content/uploads/2018/05/suelos-de-ceramica-768x514.jpg?auto=webp&quality=45&width=1920&crop=16:9,smart,safe"
                                            className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                        />
                                        <h6 className="text-xl font-semibold">Plantas de MP para cer&aacute;micos</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Plantas de proceso de materia prima para generar
                                            diferentes productos como pisos cerámicos de diferentes
                                            tipos y diferentes tipos materiales de construcción.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSite />
        </>
    )
}

export default HomeSite;