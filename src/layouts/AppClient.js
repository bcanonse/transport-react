import React from 'react';
import { Switch, Redirect, Route } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterApp from "components/Footers/FooterApp";

// user context
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";
import SideBarApp from 'components/Sidebar/SideBarApp';
import Vendedores from 'views/app/Vendedores';
import Cotizaciones from 'views/app/Cotizaciones';
import CardRegisterVendedor from 'components/Cards/app/CardRegisterVendedor';
import CardRegisterCotizacion from 'components/Cards/app/CardRegisterCotizacion';
import { CardAsignarVendedor } from 'components/Cards/app/CardAsignarVendedor';

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
                                <Route path="/app/quotes" exact component={Cotizaciones} />
                                <Route path="/app/quotes/create" exact component={CardRegisterCotizacion} />
                                <Route path="/app/quotes/modify" exact component={CardAsignarVendedor} />
                                <Redirect from="/app" to="/app/dashboard" />
                            </Switch>
                            <FooterApp />
                        </div>
                    </div>
                </ProtectedRoutes>
            </AuthProvider>
        </>
    );
}