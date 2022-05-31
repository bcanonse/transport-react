import {
    updateCustomDoc,
    createDoc,
    deleteCustomDoc,
    filterDoc
} from "firebase/firebase";

const path = "proveedores";

export const getProveedoresService = async (codigo) => {
    const values = [];
    const proveedores = await filterDoc(codigo, path, "id_negocio");
    for (const doc of proveedores.docs) {
        const data = {
            id: doc.id,
            meta: doc.data()
        }
        values.push(data);
    }
    return values;
}

export const deleteProveedor = async (id) => {
    await deleteCustomDoc(path, id);
}

export const createProveedor = async (proveedor) => {
    return await createDoc(path, proveedor);
}

export const updateProveedor = async (id, proveedor) => {
    return await updateCustomDoc(path, id, proveedor);
}