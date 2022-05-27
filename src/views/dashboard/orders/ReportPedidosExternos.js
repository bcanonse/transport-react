import React from "react";

// components
import CardStats from "components/Cards/CardStats.js";
import { getPedidosExternosReport, filterPedExternosFromDate } from "firebase/reports";
import { TablePedidosExternos } from "./TablePedidosExternos";

const format = new Intl.NumberFormat('en-US');

export const ReportPedidosExternos = () => {
    const [loading, setLoading] = React.useState(true);

    const [totalPedidos, setTotalPedidos] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);
    const [totalCurrent, setTotalCurrent] = React.useState(0);

    const [pedidos, setPedidos] = React.useState([]);

    const getInventarios = async () => {
        setLoading(true);
        const response = await getPedidosExternosReport();
        setPedidos(response);

        let maxTotal = 0.00;
        let maxCantidad = 0.00;

        for (const data of response) {
            maxTotal += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
            maxCantidad += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad)), 0);
        }

        const filters = await filterPedExternosFromDate();

        let totalMonth = 0.00;
        for (const value of filters) {
            const { detalle } = value.data();
            totalMonth += detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
        }

        setTotalPedidos(maxTotal.toFixed(2));
        setTotalItems(maxCantidad.toFixed(2));
        setTotalCurrent(totalMonth.toFixed(2));

        setLoading(false);
    }


    React.useEffect(() => {
        getInventarios();
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
                        <h1 className="text-3xl font-bold text-blueGray-500 text-center mb-4">Reporte de pedidos en línea</h1>
                        <h5 className="text-2xl font-medium text-blueGray-500 text-center mb-4">Planta de materia prima cer&aacute;micos</h5>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <CardStats
                                    statSubtitle="Total monetario en pedidos"
                                    statTitle={`Q ${format.format(totalPedidos)}`}
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
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <CardStats
                                    statSubtitle="Total de ítems pedidos en línea"
                                    statTitle={`${totalItems} unidades`}
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
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <CardStats
                                    statSubtitle="Planta de materia prima cerámicos"
                                    statTitle={`Q ${format.format(totalCurrent)}`}
                                    statArrow="down"
                                    statPercent="1.10"
                                    statPercentColor="text-orange-500"
                                    statDescripiron="El mes actual"
                                    statIconName="fas fa-chart-pie"
                                    statIconColor="bg-pink-500"
                                    background="bg-lightBlue-900"
                                    colorTitle="text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <TablePedidosExternos pedidos={pedidos} />
                {/* <TableServicioVendedor servicios={servicios} /> */}
            </div>
        </>
    );
}