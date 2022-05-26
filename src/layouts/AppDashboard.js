import React from 'react';
import { Switch, Redirect } from "react-router-dom";


// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterApp from "components/Footers/FooterApp";

// user context
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";
import { SidebarAdmin } from 'components/Sidebar/SidebarAdmin';
import HeaderStats from 'components/Headers/HeaderStats';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from 'views/admin/Dashboard';
import { ReportCotizaciones } from 'views/dashboard/ReportCotizaciones';
import { ReportServicios } from 'views/dashboard/ReportServicios';



export default function AppDashboard() {
    return (
        <>
            <AuthProvider>
                <ProtectedRoutes>
                    <SidebarAdmin />
                    <div className="relative md:ml-64 bg-blueGray-100">
                        <AdminNavbar />
                        <HeaderStats />
                        <div className="px-4 md:px-10 mx-auto w-full -m-24">
                            <Switch>
                                <Route path='/dashboard' exact component={Dashboard} />
                                <Route path='/dashboard/reports-quotes' exact component={ReportCotizaciones} />
                                <Route path='/dashboard/reports-services' exact component={ReportServicios} />
                                <Redirect from="/dashboard" to="/dashboard/" />
                            </Switch>
                            <FooterApp />
                        </div>
                    </div>
                </ProtectedRoutes>
            </AuthProvider>
        </>
    )
}