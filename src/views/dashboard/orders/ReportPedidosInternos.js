import React from "react";

// components
import CardStats from "components/Cards/CardStats.js";
import { getPedInternosReport } from "firebase/reports";
import { TablePedidosPorNegocio } from "./TablePedidosPorNegocio";
import { TablePedidosProductos } from "./TablePedidosProductos";

const format = new Intl.NumberFormat('en-US');

export const ReportPedidosInternos = () => {

    const [loading, setLoading] = React.useState(true);
    const [totalUno, setTotalUno] = React.useState(0);
    const [totalDos, setTotalDos] = React.useState(0);
    const [totalTres, setTotalTres] = React.useState(0);
    const [totalCuatro, setTotalCuatro] = React.useState(0);
    const [totalCinco, setTotalCinco] = React.useState(0);
    const [totalSeis, setTotalSeis] = React.useState(0);

    const [pedidos, setPedidos] = React.useState([]);

    const getServicios = async () => {
        let totalUno = 0;
        let totalDos = 0;
        let totalTres = 0;
        let totalCuatro = 0;
        let totalCinco = 0;
        let totalSeis = 0;
        setLoading(true);
        const response = await getPedInternosReport();
        setPedidos(response);

        for (const data of response) {
            switch (data.negocio_recibe) {
                case 1:
                    totalUno += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
                    break;
                case 2:
                    totalDos += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
                    break;
                case 3:
                    totalTres += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
                    break;
                case 4:
                    totalCuatro += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
                    break;
                case 5:
                    totalCinco += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
                    break;
                default:
                    totalSeis += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
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
        getServicios();
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
                        <h1 className="text-3xl font-bold text-blueGray-500 text-center mb-4">Reporte de pedidos internos</h1>
                        <h5 className="text-2xl font-medium text-blueGray-500 text-center mb-4">Total de precios solicitados por otros negocios</h5>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Planta de extracción minera"
                                    statTitle={`Q ${format.format(totalCinco)}`}
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
                                    statTitle={`Q ${format.format(totalDos)}`}
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
                                    statTitle={`Q ${format.format(totalSeis)}`}
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
                                    statTitle={`Q ${format.format(totalTres)}`}
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
                                    statTitle={`Q ${format.format(totalCuatro)}`}
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
                                    statTitle={`Q ${format.format(totalUno)}`}
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
                <TablePedidosPorNegocio pedidos={pedidos} />
                <TablePedidosProductos pedidos={pedidos} />
            </div>
        </>
    );
}