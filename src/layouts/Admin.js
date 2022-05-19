import React from "react";
import { Switch, Route } from "react-router-dom";
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// views

import Users from "views/admin/Users";
import FooterApp from "components/Footers/FooterApp";
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";
import CardRegisterUser from "components/Cards/CardRegisterUser";
import Negocios from "views/admin/Negocios";
import CardRegisterNegocio from "components/Cards/CardRegisterNegocio";
import Sucursales from "views/admin/Sucursales";
import CardRegisterSucursal from "components/Cards/CardRegisterSucursal";
import Permissions from "views/admin/Permissions";
import CardRegisterPermissions from "components/Cards/CardRegisterPermissions";



export default function Admin() {
  return (
    <>
      <AuthProvider>
        <ProtectedRoutes>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Switch>
                <Route path="/admin/users" exact component={Users} />
                <Route path="/admin/users/create" exact component={CardRegisterUser} />
                <Route path="/admin/users/permissions" exact component={Permissions} />
                <Route path="/admin/users/permissions/create" exact component={CardRegisterPermissions} />
                <Route path="/admin/negocios" exact component={Negocios} />
                <Route path="/admin/negocios/create" exact component={CardRegisterNegocio} />
                <Route path="/admin/sucursales" exact component={Sucursales} />
                <Route path="/admin/sucursales/create" exact component={CardRegisterSucursal} />
                {/* <Redirect from="/admin" to="/admin/users" /> */}
              </Switch>
              <FooterApp />
            </div>
          </div>
        </ProtectedRoutes>
      </AuthProvider>

    </>
  );
}
