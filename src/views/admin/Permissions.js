import React from "react";

import { getCollections } from "firebase/firebase";
import { useLocation } from "react-router-dom";
import CardPermissions from "components/Cards/CardPermissions";

export default function Permissions() {
    const location = useLocation();
    const user = location.state.userNegocio;

    const [negocios, setNegocios] = React.useState([]);


    const getAccesoUsuarios = async () => {
        const values = [];
        let negociosList = [];
        const resAcceso = await getCollections("acceso_usuarios");
        resAcceso.forEach(element => {
            values.push(element.data())
        });

        const negocios = await getCollections("negocios");
        negocios.forEach(element => {
            const { codigo } = element.data();
            for (const value of values) {
                const { id_negocio: codigoNegocio } = value;
                if (codigoNegocio !== codigo) continue
                negociosList.push(element.data())
            }
        })
        setNegocios(negociosList.sort())
    }

    React.useEffect(() => {
        getAccesoUsuarios();
    }, []);


    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <h1 className="relative text-4xl text-white">{`Permisos a negocios del usuario: ${user.username && ''}`}</h1>
                    <CardPermissions title={"Negocios al que tiene acceso"} list={negocios} user={user} />
                </div>
            </div>

        </>
    )
}