import React, { useCallback, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCompass, FaDoorOpen, FaFileAlt, FaHome, FaStar, FaUser } from "react-icons/fa";
import AppName from "../shared/AppName";
import { getCurrentUser, logout } from "../../services/authService";

const studentNavItems = [
    { path: "/student/dashboard", label: "Overview", icon: FaHome },
    { path: "/student/search", label: "Find housing", icon: FaCompass },
    { path: "/student/applications", label: "My applications", icon: FaFileAlt },
    { path: "/student/review", label: "Reviews", icon: FaStar },
    { path: "/student/profile", label: "Profile", icon: FaUser },
];

function StudentNavigation() {
    const navigate = useNavigate();
    const user = useMemo(() => getCurrentUser(), []);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [navigate]);

    const displayName = user?.name || "Student";

    return (
        <header className="student-nav-shell">
            <div className="student-nav-bar">
                <Link to="/student/dashboard" className="student-nav-brand" aria-label="Student home">
                    <AppName compact />
                </Link>

                <nav aria-label="Student navigation" className="student-nav-links">
                    {studentNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/student/dashboard"}
                            className={({ isActive }) =>
                                `student-nav-link${isActive ? " active" : ""}`
                            }
                        >
                            <item.icon aria-hidden="true" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="student-nav-actions">
                    <span className="student-nav-user">{displayName}</span>
                    <button type="button" className="student-signout" onClick={handleLogout}>
                        <FaDoorOpen aria-hidden="true" />
                        <span>Sign out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default StudentNavigation;
