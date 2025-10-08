import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaPlusCircle, FaUsers, FaBuilding } from "react-icons/fa";
import { logout } from "../../../services/authService";


export default function MyListings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <Link to="/landlord-profile" className="profile-link">
          <p className="profile-role">Landlord</p>
            <img
              src="/profile-pic.jpg"
              alt="Profile"
              className="profile-img"
            />
            <span className="profile-name">John Doe</span>

          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/landlord/dashboard" end>
                <FaHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-listings" end className="active-link">
                <FaList /> My Listings
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-listing" end>
                <FaPlusCircle /> Add Listing
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications-requests" end>
                <FaUsers /> Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/assign-accommodation" end>
                <FaBuilding /> Assign Accommodation
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>My Listings</h1>
          <div className="header-actions">
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              Sign out
            </button>
            <Link to="/add-listing">
              <button className="btn-primary">+ Add Listing</button>
            </Link>
          </div>
        </header>

        <section className="listing-grid">
          <div className="listing-card">
            <h3>Student Residence A</h3>
            <p>12 Rooms · 8 Occupied</p>
            <div className="progress-bar">
              <span style={{ width: "67%" }}></span>
            </div>
          </div>

          <div className="listing-card">
            <h3>Student House B</h3>
            <p>6 Rooms · 4 Occupied</p>
            <div className="progress-bar">
              <span style={{ width: "66%" }}></span>
            </div>
          </div>

          <div className="listing-card">
            <h3>Apartment C</h3>
            <p>10 Rooms · 5 Occupied</p>
            <div className="progress-bar">
              <span style={{ width: "50%" }}></span>
            </div>
          </div>
        </section>
      </main>

      {/* Styles */}
      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
          background: #f5f7fb;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #003366, #0055aa);
          color: white;
          padding: 25px;
          flex-shrink: 0;
        }

        .sidebar-profile {
          text-align: center;
          margin-bottom: 40px;
        }

        .profile-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-bottom: 10px;
        }

        .profile-name {
          font-size: 18px;
         color: #0055aa;
          font-weight: bold;
        }

        .profile-role {
  font-size: 20px; /* make it big */
  font-weight: bold;
  margin-bottom: 10px;
  color: #1485f7ff; /* adjust to match your theme */
}
          .profile-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit; /* Keeps the white text */
}


        .sidebar nav ul {
          list-style: none;
          padding: 0;
        }

        .sidebar nav li {
          margin: 20px 0;
        }

        .sidebar nav a {
          color: #ddd;
          text-decoration: none;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .sidebar nav a:hover,
        .active-link {
          background: #483ab0;
          color: #fff !important;
        }
        
        .sidebar-footer {
          margin-top: 40px;
        }

        .btn-logout {
          width: 100%;
          padding: 10px 14px;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-logout:hover {
          background: rgba(255,255,255,0.3);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 30px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-secondary {
          background: transparent;
          color: #003366;
          border: 1px solid #d0d7e2;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .btn-secondary:hover {
          background: #003366;
          color: #fff;
        }

        h1 {
          font-size: 24px;
        }

        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-primary:hover {
          background: #372a8a;
        }

        /* Listings */
        .listing-grid {
          display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .listing-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);

        }
        
        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress-bar span {
          display: block;
          height: 100%;
          background: #483ab0;
        }
      `}</style>
    </div>
  );
}
