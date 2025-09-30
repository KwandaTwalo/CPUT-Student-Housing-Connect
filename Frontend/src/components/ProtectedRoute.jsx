import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const location = useLocation();
    const user = getCurrentUser();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location, message: "Please sign in to continue." }}
            />
        );
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                    message: "You do not have permission to view that page.",
                }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;