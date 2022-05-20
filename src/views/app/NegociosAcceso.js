import React from "react";
import CardNegocioAcceso from "components/Cards/app/CardNegocioAcceso";
import { AuthProvider } from "context/AuthProvider";
import ProtectedRoutes from "views/auth/ProtectedRoutes";

export default function NegociosAcceso() {
    
    return (
        <>
            <AuthProvider>
                <ProtectedRoutes>
                    <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                        <div className="px-4 md:px-10 mx-auto w-full">
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <CardNegocioAcceso />
                            </div>
                        </div>
                    </div>
                </ProtectedRoutes>
            </AuthProvider>
        </>
    );
}