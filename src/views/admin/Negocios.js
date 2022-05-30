import CardNegocios from 'components/Cards/CardNegocios';
import React from 'react';
import { deleteNegocio } from 'services/negocio/negocioService';

import { getNegociosService } from 'services/negocio/negocioService';

export default function Negocios() {
    const [maxCodigo, setMaxCodigo] = React.useState(0);
    const [negocios, setNegocios] = React.useState([]);

    const getNegocios = async () => {
        const response = await getNegociosService();
        const maxCodigo = response.map(value => value.meta.codigo);
        setNegocios(response);
        setMaxCodigo(Math.max(...maxCodigo))
    }

    const handleClickDelete = async (data, evt) => {
        if (data.id) {
            try {
                await deleteNegocio(data.id);
                const neg = negocios.filter((value) => value.id !== data.id);
                setNegocios(neg);
            } catch (error) {
                console.error(error);
            }
        }
    }

    React.useEffect(() => {
        getNegocios();
    }, [])

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardNegocios handleClick={handleClickDelete} title={"Negocios"} max={maxCodigo} list={negocios} />
                </div>
            </div>
        </>
    );
}