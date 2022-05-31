import {
    updateCustomDoc,
    createDoc,
    deleteCustomDoc,
    filterDoc
} from "firebase/firebase";

const path = "vendedores";

export const getVendedoresService = async (codigo) => {
    const values = [];
    const vendedores = await filterDoc(codigo, path, "id_negocio");
    for (const doc of vendedores.docs) {
        const data = {
            id: doc.id,
            meta: doc.data()
        }
        values.push(data);
    }
    return values;
}

export const deleteVendedor = async (id) => {
    await deleteCustomDoc(path, id);
}

export const createVendedor = async (vendedor) => {
    return await createDoc(path, vendedor);
}

export const updateVendedor = async (id, vendedor) => {
    return await updateCustomDoc(path, id, vendedor);
}