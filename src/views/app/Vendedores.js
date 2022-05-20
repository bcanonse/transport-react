import React, { useCallback } from "react";

import CardVendedores from "components/Cards/app/CardVendedores";
import { filterDoc } from "firebase/firebase";

export default function Vendedores() {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);

    const [vendedores, setVendedores] = React.useState([]);

    const getVendedores = useCallback(async () => {
        const tVendedores = [];
        const response = await filterDoc(negocio.codigo, "vendedores", "id_negocio");
        response.forEach(element => {
            tVendedores.push(element.data())
        });
        setVendedores(tVendedores);
    }, [negocio]);


    React.useEffect(() => {
        getVendedores()
    }, [getVendedores]);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardVendedores title={"Vendedores"} list={vendedores} />
                </div>
            </div>
        </>
    );
}