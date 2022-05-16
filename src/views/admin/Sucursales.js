import React from "react";

import { getCollections } from "firebase/firebase";
import CardSucursales from "components/Cards/CardSucursales";

export default function Sucursales() {

    const [sucursales, setSucursales] = React.useState([]);

    const getSucursales = async () => {
        const tSucursales = [];
        const tNegocios = [];
        const response = await getCollections("sucursales");
        response.forEach(element => {
            tSucursales.push(element.data())
        });

        const responseNegocio = await getCollections("negocios");
        responseNegocio.forEach(element => {
            tSucursales.forEach((data) => {
                const { codigo } = element.data();
                if (codigo === data.id_negocio) {
                    data.negocio = element.data()
                }
            })
            tNegocios.push(element.data());
        });
        setSucursales(tSucursales);
    }


    React.useEffect(() => {
        getSucursales()
    }, []);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardSucursales title={"Sucursales"} list={sucursales} />
                </div>
            </div>
        </>
    );
}