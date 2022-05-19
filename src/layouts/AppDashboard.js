import React from 'react';
import { Switch, Redirect } from "react-router-dom";


// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import FooterApp from "components/Footers/FooterApp";

// user context
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";
import SideBarApp from 'components/Sidebar/SideBarApp';



export default function AppDashboard() {
    return(
        <>
            <AuthProvider>
                <ProtectedRoutes>
                    <SideBarApp />
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