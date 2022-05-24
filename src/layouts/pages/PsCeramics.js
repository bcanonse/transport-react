import FooterSite from 'components/Footers/FooterSite';
import NavbarSiteCart from 'components/Navbars/NavBarSiteCart';
import { getImageUrl } from 'firebase/firebase';
import { filterDoc } from 'firebase/firebase';
import React from 'react';
import { useHistory } from "react-router-dom";


const PsCeramics = () => {
    let detalleStorage = sessionStorage.getItem("detalle");
    detalleStorage = JSON.parse(detalleStorage);

    const navigate = useHistory();

    const [productos, setProductos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [detalle, setDetalle] = React.useState(detalleStorage ?? []);

    const getProductos = async () => {
        const values = [];
        const response = await filterDoc(6, "productos", "id_negocio");
        response.forEach(element => {
            const { estado, tipoProducto } = element.data();
            if (estado && tipoProducto === 'Producto terminado') {
                values.push(element.data());
            }
        });

        for (const value of values) {
            const url = await getImageUrl(value.imagen);
            value.url = url;
        }
        setLoading(false);
        setProductos(values);
    }

    const handleAddItem = (data, event) => {
        event.preventDefault();
        setDetalle([
            ...detalle,
            data
        ]);
    }

    const handleClickCart = (event) => {
        event.preventDefault();
        if (detalle.length) {
            sessionStorage.setItem("detalle", JSON.stringify(detalle));
            navigate.push('/business/ceramics/cart');    
        }
        
    }

    React.useEffect(() => {
        window.scroll(0, 0);
        getProductos();
    }, []);


    return (
        <>
            <NavbarSiteCart detail={detalle} handleClick={handleClickCart} />
            <main>
                {/* Form quote */}
                <section className={

                    "pb-20 relative block bg-blueGray-800 " +
                    (loading ? "animate-pulse" : "")
                }>
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-800 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 pt-24 pb-64">
                        <div className="flex flex-wrap text-center justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="text-4xl mb-4 font-semibold text-white">
                                    Plantas de MP para cer&aacute;micos
                                </h2>
                                <img
                                    alt="..."
                                    src="https://decortips.com/es/wp-content/uploads/2018/05/suelos-de-ceramica-768x514.jpg?auto=webp&quality=45&width=1920&crop=16:9,smart,safe"
                                    className="w-32 h-32 mb-5 shadow-lg rounded-full inline-flex items-center justify-center text-center"
                                />
                                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                                    Venta de piso cerámico de alta calidad, M&aacute;rmol, Esfumado, Liso, Piedra,
                                    Geométrico, Granito, Madera.
                                    <br />
                                    <br />

                                    {/* // TodO: Quitar esta descripcion y si es posible agregar carrito de compras. */}
                                    Nuestros clientes avalan, el excelente producto que brindamos, as&iacute; que
                                    no dudes en comunicarte con nosotros y solicitar información sobre nuestros
                                    productos de materia prima para generar pisos cer&aacute;micos de alta calidad y
                                    con un gran aspecto.

                                </p>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center text-center lg:-mt-64 -mt-48">
                            {
                                productos.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-full sm:w-6/12 lg:w-4/12 px-4 py-4">
                                            <img
                                                alt="Canto rodado"
                                                src={data.url}
                                                className="w-64 h-64 mb-5 object-cover shadow-xl rounded-lg inline-flex items-center justify-center text-center"
                                            />
                                            <h2 className="text-xl mb-4 font-semibold text-white">
                                                {data.nombre}
                                            </h2>
                                            <h5 className="text-sm mb-4 font-medium text-white">
                                                Precio: Q. {data.costo}
                                            </h5>
                                            <h6 className="text-xs mb-4 font-medium text-white">
                                                SKU: {data.sku}
                                            </h6>
                                            <button
                                                className="bg-blueGray-200 text-blueGray-500 font-bold text-sm px-6 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                onClick={handleAddItem.bind(this, data)}
                                            >
                                                Comprar
                                            </button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
            <FooterSite />
        </>
    )
}

export default PsCeramics;