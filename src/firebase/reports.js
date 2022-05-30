import { collection, getDocs, query, where } from "firebase/firestore";
import { db, filterDoc, getCollections } from "./firebase";


export const getFacturas = async () => {
    const values = [];
    const response = await getCollections("facturas");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const getPedidosEnLinea = async () => {
    const values = [];
    const response = await getCollections("pedidos_externos");
    response.docs.forEach((value) => {
        values.push(value.data())
    })
    return values;
}

export const filterPedidosFromDate = async () => {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const fromQuery = query(collection(db, "pedidos_externos"), where(
        "fecha", ">=", start
    ), where(
        "fecha", "<=", end
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot.docs;
}

export const filterFacturasFromDate = async () => {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const fromQuery = query(collection(db, "facturas"), where(
        "fechaHora", ">=", start
    ), where(
        "fechaHora", "<=", end
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot.docs;
}

export const getCotizacionesReport = async () => {
    const values = [];
    const response = await getCollections("cotizaciones");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const getServiciosReport = async () => {
    const values = [];
    const response = await getCollections("servicios");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const filterCotizacionesFromDate = async () => {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const fromQuery = query(collection(db, "cotizaciones"), where(
        "fecha", ">=", start
    ), where(
        "fecha", "<=", end
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot.docs;
}

export const getInventariosReport = async () => {
    const values = [];
    const response = await getCollections("inventarios");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const getPedidosExternosReport = async () => {
    const values = [];
    const response = await getCollections("pedidos_externos");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}


export const filterPedExternosFromDate = async () => {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const fromQuery = query(collection(db, "pedidos_externos"), where(
        "fecha", ">=", start
    ), where(
        "fecha", "<=", end
    ));

    const querySnapshot = await getDocs(fromQuery);
    return querySnapshot.docs;
}

export const getPedInternosReport = async () => {
    const values = [];
    const response = await getCollections("pedidos_internos");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const getFacturasReport = async () => {
    const values = [];
    const response = await getCollections("facturas");
    response.docs.forEach((value) => {
        values.push(value.data());
    })
    return values;
}

export const getFacturasFilterReport = async () => {
    const values = [];
    const facturas = await getCollections("facturas");

    for (const value of facturas.docs) {
        const factura = value.data();
        const clientes = await filterDoc(factura.id_cliente, "clientes", "id");
        clientes.forEach((cliente) => {
            factura.cliente = cliente.data();
        });
        values.push(factura);
    }
    return values;
}