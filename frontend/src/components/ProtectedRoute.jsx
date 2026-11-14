
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function ProtectedRoute({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const verifyAdmin = async () => {
            try {
                await api.get("/api/admin/profile");
                setIsAuthenticated(true);

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyAdmin();

    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="loading-screen">
                Checking authentication...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
