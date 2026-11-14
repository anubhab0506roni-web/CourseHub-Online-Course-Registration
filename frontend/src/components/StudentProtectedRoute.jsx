
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const StudentProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkStudent = async () => {
            try {
                await api.get("/api/students/profile");
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkStudent();
    }, []);

    if (isAuthenticated === null) {
        return <h2 style={{ textAlign: "center", marginTop: "100px" }}>
            Checking login...
        </h2>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/student/login" replace />;
    }

    return children;
};

export default StudentProtectedRoute;
