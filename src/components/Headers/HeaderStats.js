import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { getFacturas } from "firebase/reports";
import { filterPedidosFromDate } from "firebase/reports";
import { filterFacturasFromDate } from "firebase/reports";

export default function HeaderStats() {
  const [loading, setLoading] = React.useState(true);
  const [sales, setSales] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [totalOrderDate, setTotaOrderDate] = React.useState(0);
  const [salesFromDate, setSalesFromDate] = React.useState(0);

  const renderFacturas = async () => {
    let total = 0;
    let cantidad = 0;
    setLoading(true);
    const facturas = await getFacturas();

    for (const data of facturas) {

      total += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
      cantidad += data.detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad)), 0);
    }

    const pedidos = await filterPedidosFromDate();
    const facturasFromDate = await filterFacturasFromDate();

    let totalSales = 0
    for (const value of facturasFromDate) {
      const { detalle } = value.data();
      totalSales += detalle.reduce((previous, current) => previous + (parseFloat(current.cantidad) * parseFloat(current.precio)), 0);
    }

    setSalesFromDate(totalSales.toFixed(2));
    setTotaOrderDate(pedidos.length);
    setSales(total.toFixed(2));
    setQuantity(cantidad);
    setLoading(false);
  }

  React.useEffect(() => {
    renderFacturas()
  }, []);


  return (
    <>
      {/* Header */}
      <div className={
        "relative bg-lightBlue-600 md:pt-32 pb-32 pt-12 " +
        (loading ? "animate-pulse" : "")
      }
      >
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Items vendidos"
                  statTitle={quantity.toString()}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Desde el inicio de operaciones"
                  statIconName="fas fa-box"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Pedidos en línea"
                  statTitle={totalOrderDate.toString()}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Generados el ultimo mes"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Ventas totales"
                  statTitle={`Q ${sales}`}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Desde el inicio de operaciones"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Ventas totales"
                  statTitle={`Q ${salesFromDate}`}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Del mes actual"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
