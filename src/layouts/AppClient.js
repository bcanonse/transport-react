import React from 'react';
import { Switch, Redirect, Route } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";

// user context
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";
import SideBarApp from 'components/Sidebar/SideBarApp';
import Vendedores from 'views/app/Vendedores';
import Cotizaciones from 'views/app/Cotizaciones';
import CardRegisterVendedor from 'components/Cards/app/CardRegisterVendedor';
import CardRegisterCotizacion from 'components/Cards/app/CardRegisterCotizacion';
import { CardAsignarVendedor } from 'components/Cards/app/CardAsignarVendedor';
import { CardUpdateVendedor } from 'components/Cards/app/CardUpdateVendedor';
import { Clientes } from 'views/app/Clientes';
import { CardRegisterCliente } from 'components/Cards/app/CardRegisterCliente';
import { CardUpdateCliente } from 'components/Cards/app/CardUpdateCliente';
import { Productos } from 'views/app/Productos';
import { CardRegisterProducto } from 'components/Cards/app/CardRegisterProducto';
import { CardUpdateProducto } from 'components/Cards/app/CardUpdateProducto';
import { Proveedores } from 'views/app/Proveedores';
import { CardRegisterProveedor } from 'components/Cards/app/CardRegisterProveedor';
import { CardUpdateProveedor } from 'components/Cards/app/CardUpdateProveedor';

export default function AppClient() {
    let negocio = localStorage.getItem("negocio");
    negocio = JSON.parse(negocio);
    return (
        <>
            <AuthProvider>
                <ProtectedRoutes>
                    <SideBarApp />
                    <div className="relative md:ml-64 bg-blueGray-100">
                        <AdminNavbar title={negocio.nombre} />
                        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                            <div className="px-4 md:px-10 mx-auto w-full">
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 md:px-10 mx-auto w-full -m-24">
                            <Switch>
                                <Route path="/app/vendors" exact component={Vendedores} />
                                <Route path="/app/vendors/create" exact component={CardRegisterVendedor} />
                                <Route path="/app/vendors/modify" exact component={CardUpdateVendedor} />
                                <Route path="/app/clients" exact component={Clientes} />
                                <Route path="/app/clients/create" exact component={CardRegisterCliente} />
                                <Route path="/app/clients/modify" exact component={CardUpdateCliente} />
                                <Route path="/app/manufacturers" exact component={Proveedores} />
                                <Route path="/app/manufacturers/create" exact component={CardRegisterProveedor} />
                                <Route path="/app/manufacturers/modify" exact component={CardUpdateProveedor} />
                                <Route path="/app/products" exact component={Productos} />
                                <Route path="/app/products/create" exact component={CardRegisterProducto} />
                                <Route path="/app/products/modify" exact component={CardUpdateProducto} />
                                <Route path="/app/quotes" exact component={Cotizaciones} />
                                <Route path="/app/quotes/create" exact component={CardRegisterCotizacion} />
                                <Route path="/app/quotes/modify" exact component={CardAsignarVendedor} />
                                <Redirect from="/app" to="/app/dashboard" />
                            </Switch>
                        </div>
                    </div>
                </ProtectedRoutes>
            </AuthProvider>
        </>
    );
}