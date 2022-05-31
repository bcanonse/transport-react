import {
    updateCustomDoc,
    createDoc,
    deleteCustomDoc,
    filterDoc
} from "firebase/firebase";

const path = "productos";

export const getProductosService = async (codigo) => {
    const values = [];
    const productos = await filterDoc(codigo, path, "id_negocio");
    for (const doc of productos.docs) {
        const data = {
            id: doc.id,
            meta: doc.data()
        }
        values.push(data);
    }
    return values;
}

export const deleteProducto = async (id) => {
    await deleteCustomDoc(path, id);
}

export const createProducto = async (producto) => {
    return await createDoc(path, producto);
}

export const updateProducto = async (id, producto) => {
    return await updateCustomDoc(path, id, producto);
}