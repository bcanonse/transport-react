import { createDoc, deleteCustomDoc, getCollections } from '../../firebase/firebase'


export const getNegociosService = async () => {
    const values = [];
    const negocios = await getCollections("negocios");
    for (const doc of negocios.docs) {
        const data = {
            id: doc.id,
            meta: doc.data()
        }
        values.push(data);
    }
    return values;
}

export const createNegocio = async (negocio) => {
    const response = await createDoc("negocios", negocio);
    return response;
}

export const deleteNegocio = async (id) => {
    await deleteCustomDoc("negocios", id);
}

