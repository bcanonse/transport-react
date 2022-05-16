import CardNegocios from 'components/Cards/CardNegocios';
import React from 'react';

import { getCollections } from "firebase/firebase";

export default function Negocios() {
    const [maxCodigo, setMaxCodigo] = React.useState(0);
    const [negocios, setNegocios] = React.useState([]);

    const getNegocios = async () => {
        const values = [];
        const response = await getCollections("negocios");
        response.forEach(element => {
            values.push(element.data())
        });
        const maxCodigo = values.map(value => value.codigo);
        setNegocios(values);
        setMaxCodigo(Math.max(...maxCodigo))
    }

    React.useEffect(() => {
        getNegocios();
    }, [])

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardNegocios title={"Negocios"} max={maxCodigo} list={negocios} />
                </div>
            </div>
        </>
    );
}