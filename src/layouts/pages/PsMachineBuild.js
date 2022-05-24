import FooterSite from "components/Footers/FooterSite";
import NavbarSite from "components/Navbars/NavBarSite";
import FormQuote from "../../components/Forms/FormQuote";

const PsMachineBuild = () => {
    window.scroll(0, 0)
    return (
        <>
            <NavbarSite />
            <main>
                {/* Form quote */}
                <section className="pb-20 relative block bg-blueGray-800">
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
                                className="text-blueGray-800 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 pt-24 pb-64">
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="text-4xl mb-4 font-semibold text-white">
                                    Maquinaria de construcci&oacute;n
                                </h2>
                                <img
                                    alt="..."
                                    src="https://www.schaeffler.cn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/47425_header-schaeffler-industry-solutions-offroad-construction-machinery_rwd_1200.jpg"
                                    className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                />
                                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                                    Venta y alquiler de maquinaria de construcción, con sucursales en puntos claves de Guatemala,
                                    Xela, Zacapa y Pet&eacute;n.
                                    <br />
                                    <br />

                                    Nuestros clientes avalan, el excelente servicio que brindamos, as&iacute; que
                                    no dudes en comunicarte con nosotros y solicitar información sobre nuestro servicio
                                    de venta y alquiler de maquinaria de construcci&oacute;n.

                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 pt-10 pb-64">
                        <h1 className="text-center text-white text-3xl pb-5" >Estas son las diferentes máquinas disponible para su venta y alquiler</h1>
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Excavadora"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/CM20200803-7d970-4b60a?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Excavadora
                                </h2>
                            </div>
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Pavimentadoras de asfalto"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/C10412030?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Pavimentadoras de asfalto
                                </h2>
                            </div>
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Compactadores"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/CM20130904-45250-23505?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Compactadores
                                </h2>
                            </div>
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Camiones de obras"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/C833061?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Camiones de obras
                                </h2>
                            </div>
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Perforadoras"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/C833758?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Perforadoras
                                </h2>
                            </div>
                            <div className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                <img
                                    alt="Cargadores de cadenas"
                                    src="https://s7d2.scene7.com/is/image/Caterpillar/C833750?$cc-s$"
                                    className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                />
                                <h2 className="text-xl mb-4 font-semibold text-white">
                                    Cargadores de cadenas
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                                    <FormQuote company={4} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSite />
        </>
    )
}

export default PsMachineBuild;