import FormQuote from "../../components/Forms/FormQuote";

const PsBuildService = () => {
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
                                    Construcci&oacute;n en general
                                </h2>
                                <img
                                    alt="..."
                                    src="data:image/jpeg;base64,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"
                                    className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                />
                                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                                    Servicios de Construcción en general, como puentes, carreteras y edificios.
                                    <br />
                                    <br />

                                    Nuestros clientes avalan, el excelente servicio que brindamos, as&iacute; que
                                    no dudes en comunicarte con nosotros y solicitar información sobre nuestro servicio
                                    de construcci&oacute;n.

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
                                    <FormQuote company={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PsBuildService;