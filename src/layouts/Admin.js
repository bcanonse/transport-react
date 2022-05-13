import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// views

import Dashboard from "views/admin/Dashboard.js";
import Users from "views/admin/Users";
import Tables from "views/admin/Tables.js";
import FooterApp from "components/Footers/FooterApp";
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";



export default function Admin() {
  return (
    <>
      <AuthProvider>
        <ProtectedRoutes>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            {/* Header */}
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Switch>
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/users" exact component={Users} />
                <Route path="/admin/tables" exact component={Tables} />
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
              <FooterApp />
            </div>
          </div>
        </ProtectedRoutes>
      </AuthProvider>

    </>
  );
}
