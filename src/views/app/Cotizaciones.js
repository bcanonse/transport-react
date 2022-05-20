import React, { useCallback } from "react";

import CardCotizaciones from "components/Cards/app/CardCotizaciones";
import { filterDoc } from "firebase/firebase";

export default function Cotizaciones() {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const [cotizaciones, setCotizaciones] = React.useState([]);

    const getVendedores = useCallback(async () => {
        const tVendedores = [];
        const response = await filterDoc(negocio.codigo, "cotizaciones", "id_negocio");
        response.forEach(element => {
            console.log(element);
            tVendedores.push(element.data())
        });

        setCotizaciones(tVendedores);
    }, [negocio]);



    React.useEffect(() => {
        getVendedores()
    }, [getVendedores]);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardCotizaciones title={"Cotizaciones"} list={cotizaciones} />
                </div>
            </div>
        </>
    );
}