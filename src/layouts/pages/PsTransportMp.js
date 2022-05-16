import FormQuote from "../../components/Forms/FormQuote";

const PsTransportMp = () => {
    window.scroll(0,0)
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
                                    Transporte de MP
                                </h2>
                                <img
                                    alt="..."
                                    src="data:image/jpeg;base64,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"
                                    className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                />
                                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                                    Transporte de materia prima para diferentes empresas, que se
                                    dedican a la realizaci&oacute;n de concreto, entre nuestro clientes
                                    más importantes se encuentran Cemes, Cementos Progresos e Hispacensa.
                                    <br />
                                    <br />

                                    Estos clientes avalan, el excelente servicio que brindamos, as&iacute; que
                                    no dudes en comunicarte con nosotros y solicitar información sobre nuestro servicio
                                    de transporte de materia prima para la elaboraci&oacute;n de concreto.

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
                                    <FormQuote company={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    );
}

export default PsTransportMp;