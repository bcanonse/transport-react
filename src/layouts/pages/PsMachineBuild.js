import FormQuote from "../../components/Forms/FormQuote";

const PsMachineBuild = () => {
    return (
        <>
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
        </>
    )
}

export default PsMachineBuild;