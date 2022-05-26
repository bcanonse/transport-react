import React from "react";

// components



import CardStats from "components/Cards/CardStats.js";
import { getCotizacionesReport } from "firebase/reports";
import { TableCotizacionVendedor } from "./quotes/TableCotizacionVendedor";
import { TableCotizacionNegocio } from "./quotes/TableCotizacionNegocio";

export const ReportCotizaciones = () => {

    const [loading, setLoading] = React.useState(true);
    const [totalUno, setTotalUno] = React.useState(0);
    const [totalDos, setTotalDos] = React.useState(0);
    const [totalTres, setTotalTres] = React.useState(0);
    const [totalCuatro, setTotalCuatro] = React.useState(0);
    const [totalCinco, setTotalCinco] = React.useState(0);
    const [totalSeis, setTotalSeis] = React.useState(0);

    const [cotizaciones, setCotizaciones] = React.useState([]);

    const getCotizaciones = async () => {
        let totalUno = 0;
        let totalDos = 0;
        let totalTres = 0;
        let totalCuatro = 0;
        let totalCinco = 0;
        let totalSeis = 0;
        setLoading(true);
        const response = await getCotizacionesReport();
        setCotizaciones(response);

        for (const data of response) {
            switch (data.id_negocio) {
                case 1:
                    totalUno += parseFloat(data.total ?? 0);
                    break;
                case 2:
                    totalDos += parseFloat(data.total ?? 0);
                    break;
                case 3:
                    totalTres += parseFloat(data.total ?? 0);
                    break;
                case 4:
                    totalCuatro += parseFloat(data.total ?? 0);
                    break;
                case 5:
                    totalCinco += parseFloat(data.total ?? 0);
                    break;
                default:
                    totalSeis += parseFloat(data.total ?? 0);
                    break;
            }
        }

        setTotalUno(totalUno.toFixed(2));
        setTotalDos(totalDos.toFixed(2));
        setTotalTres(totalTres.toFixed(2));
        setTotalCuatro(totalCuatro.toFixed(2));
        setTotalCinco(totalCinco.toFixed(2));
        setTotalSeis(totalSeis.toFixed(2));

        setLoading(false);
    }


    React.useEffect(() => {
        getCotizaciones();
    }, [])

    return (
        <>
            {/* Header */}
            <div className={
                "relative md:pt-32 pb-32 pt-12 " +
                (loading ? "animate-pulse" : "")
            }
            >
                <div className="px-4 md:px-10 mx-auto w-full mb-8">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Planta de extracción minera"
                                    statTitle={`Q ${totalCinco}`}
                                    statArrow="up"
                                    statPercent="3.48"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-box"
                                    statIconColor="bg-red-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Exportación materia prima"
                                    statTitle={`Q ${totalDos}`}
                                    statArrow="down"
                                    statPercent="3.48"
                                    statPercentColor="text-red-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-chart-pie"
                                    statIconColor="bg-orange-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Planta de materia prima cerámicos"
                                    statTitle={`Q ${totalSeis}`}
                                    statArrow="down"
                                    statPercent="1.10"
                                    statPercentColor="text-orange-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-chart-pie"
                                    statIconColor="bg-pink-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Servicio de construcción"
                                    statTitle={`Q ${totalTres}`}
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Maquinaria de construcción"
                                    statTitle={`Q ${totalCuatro}`}
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Transporte de MP"
                                    statTitle={`Q ${totalUno}`}
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Desde el inicio de operaciones"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <TableCotizacionNegocio cotizaciones={cotizaciones} />
                <TableCotizacionVendedor cotizaciones={cotizaciones} />
            </div>
        </>
    );
}