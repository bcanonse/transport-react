import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase"

export const filterInventario = async (producto, sucursal) => {
    const fromQuery = query(collection(db, "inventarios"), where(
        "id_producto", "==", producto
    ), where(
        "id_sucursal", "==", sucursal
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot;
}

const filterInventarioProducto = async (producto) => {
    const fromQuery = query(collection(db, "inventarios"), where(
        "id_producto", "==", producto
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot;
}


const filterProducto = async (id) => {
    const fromQuery = query(collection(db, "productos"), where("id", "==", id));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot.docs[0].id;
}

export const updateAgProductoInventario = async (id, data) => {
    const docRef = doc(db, "inventarios", id);
    const idDocP = await filterProducto(data.id_producto);
    const prodRef = doc(db, "productos", idDocP);

    await updateDoc(docRef, data);

    const values = [];
    const response = await filterInventarioProducto(data.id_producto);
    response.forEach(value => {
        values.push(value.data())
    })

    const cantidadTotal = values.reduce(
        (previousValue, currentValue) => previousValue + (parseFloat(currentValue.cantidad)),
        0
    )

    await updateDoc(prodRef, {
        cantidad: cantidadTotal,
        costo: data.costo
    })
}

export const updateNuevoProdInv = async (id, data) => {
    const docRef = doc(db, "inventarios", id);
    const idDocP = await filterProducto(data.id_producto);
    const prodRef = doc(db, "productos", idDocP);

    await updateDoc(docRef, data);

    await updateDoc(prodRef, {
        cantidad: data.cantidad,
        costo: data.costo
    })
}

