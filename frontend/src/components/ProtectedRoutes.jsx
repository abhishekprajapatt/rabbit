import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, []);

    return <>{children}</>;
};

export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector((store) => store.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((store) => store.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== "instructor") {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};


// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// export const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated } = useSelector((store) => store.auth);
//     const location = useLocation();

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace state={{ from: location }} />;
//     }

//     return children;
// };

// export const AuthenticatedUser = ({ children }) => {
//     const { isAuthenticated } = useSelector((store) => store.auth);

//     if (isAuthenticated) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export const AdminRoute = ({ children }) => {
//     const { user, isAuthenticated } = useSelector((store) => store.auth);
//     const location = useLocation();

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace state={{ from: location }} />;
//     }

//     if (user?.role !== "instructor") {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };
