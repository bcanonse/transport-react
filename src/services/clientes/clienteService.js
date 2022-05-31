import {
    updateCustomDoc,
    createDoc,
    deleteCustomDoc,
    filterDoc
} from "firebase/firebase";

const path = "clientes";

export const getClientesService = async (codigo) => {
    const values = [];
    const clientes = await filterDoc(codigo, path, "id_negocio");
    for (const doc of clientes.docs) {
        const data = {
            id: doc.id,
            meta: doc.data()
        }
        values.push(data);
    }
    return values;
}

export const deleteCliente = async (id) => {
    await deleteCustomDoc(path, id);
}

export const createCliente = async (cliente) => {
    return await createDoc(path, cliente);
}

export const updateCliente = async (id, cliente) => {
    return await updateCustomDoc(path, id, cliente);
}