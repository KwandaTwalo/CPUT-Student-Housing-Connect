import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaPlusCircle,
  FaUsers,
  FaBuilding,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { logout } from "../../services/authService";

export default function Dashboard() {
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
              <NavLink
                to="/landlord/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? "active-link" : ""
                }
              >
                <FaHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-listings" end>
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

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <FaBell className="icon-btn" />
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              Sign out
            </button>
            <Link to="/add-listing">
              <button className="btn-primary">+ Create Listing</button>
            </Link>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card purple">
            <h3>Active Listings</h3>
            <p>12</p>
          </div>
          <div className="stat-card green">
            <h3>Applications</h3>
            <p>34</p>
          </div>
          <div className="stat-card orange">
            <h3>Occupied</h3>
            <p>8</p>
          </div>
          <div className="stat-card blue">
            <h3>Vacant</h3>
            <p>4</p>
          </div>
        </section>

        {/* Progress Section */}
        <section className="progress-grid">
          <div className="progress-card">
            <h3>Occupancy Rate</h3>
            <div className="circle">73%</div>
          </div>
          <div className="progress-card">
            <h3>Applications Processed</h3>
            <div className="progress-bar">
              <span style={{ width: "60%" }}></span>
            </div>
            <p>60% Completed</p>
          </div>
        </section>
      </main>

      {/* Styles */}
      <style>{`
        .dashboard-layout{
        display: flex;
        flex-direction: row;  /* side by side layout */
        height: 100vh;
        width: 100%;
        font-family: "Segoe UI", sans-serif;
        background: #f5f7fb;
       }

       .main-content {
       flex: 1;
       padding: 20px;
       overflow-y: auto;
       }


        /* Sidebar */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #003366, #0055aa);
          color: white;
          padding: 25px;
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
          color: #1485f7ff;
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
          padding: 20px;
          overflow-y: auto;
        }
          .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 12px;
          border-radius: 8px;
        }

        .search-box input {
          border: none;
          outline: none;
        }

        .icon-btn {
          font-size: 18px;
          cursor: pointer;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          text-align: center;
        }

        .stat-card h3 {
          margin-bottom: 10px;
          font-size: 18px;
        }

        .stat-card p {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        
        .purple { border-top: 4px solid #6c5ce7; }
        .green { border-top: 4px solid #00b894; }
        .orange { border-top: 4px solid #fdcb6e; }
        .blue { border-top: 4px solid #0984e3; }

        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .progress-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);        }

        .circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 8px solid #483ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px auto;
          font-weight: bold;
          font-size: 20px;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          margin: 10px 0;
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
