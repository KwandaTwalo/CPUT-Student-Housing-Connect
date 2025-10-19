import React, { useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBuilding, FaHome, FaList, FaPlusCircle, FaUsers } from "react-icons/fa";
import { logout } from "../../services/authService";

const navigation = [
    { path: "/landlord/dashboard", label: "Dashboard", icon: FaHome },
    { path: "/my-listings", label: "My Listings", icon: FaList },
    { path: "/add-listing", label: "Add Listing", icon: FaPlusCircle },
    { path: "/applications-requests", label: "Applications", icon: FaUsers },
    { path: "/assign-accommodation", label: "Assign", icon: FaBuilding },
];

function resolveRenderProp(candidate, handleLogout) {
    if (typeof candidate === "function") {
        return candidate(handleLogout);
    }
    return candidate;
}

export default function LandlordLayout({ title, description, actions, children }) {
    const navigate = useNavigate();
    const handleLogout = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [navigate]);

    const resolvedActions = resolveRenderProp(actions, handleLogout);
    const resolvedChildren = resolveRenderProp(children, handleLogout);

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-profile">
                    <Link to="/landlord-profile" className="profile-link">
                        <div className="profile-avatar" aria-hidden="true" />
                        <p className="profile-role">Landlord</p>
                        <span className="profile-name">Sipho Mbeki</span>
                        <span className="profile-email">sipho.mbeki@rentconnect.co.za</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {navigation.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end
                                    className={({ isActive }) => (isActive ? "active-link" : undefined)}
                                >
                                    <item.icon aria-hidden="true" />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button type="button" className="btn-ghost" onClick={handleLogout}>
                        Sign out
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <header className="header">
                    <div>
                        <h1>{title}</h1>
                        {description && <p>{description}</p>}
                    </div>
                    <div className="header-actions">{resolvedActions}</div>
                </header>
                <div className="dashboard-content">{resolvedChildren}</div>
            </main>
        </div>
    );
}
