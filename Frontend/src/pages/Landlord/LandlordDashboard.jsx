import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaList,
  FaPlusCircle,
  FaUsers,
  FaBuilding,
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function Dashboard() {
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

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 8px;
          padding: 5px 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .search-box input {
          border: none;
          outline: none;
          margin-left: 5px;
        }

        .icon-btn {
          font-size: 20px;
          cursor: pointer;
          color: #333;
        }

        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          font-weight: bold;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
          font-size: 14px;
          margin-bottom: 10px;
          color: #777;
        }

        .stat-card p {
          font-size: 28px;
          color: #222;
        }

        .purple { border-top: 4px solid #8e44ad; }
        .green { border-top: 4px solid #27ae60; }
        .orange { border-top: 4px solid #e67e22; }
        .blue { border-top: 4px solid #3498db; }

        /* Progress Section */
        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .progress-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        .circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 8px solid #483ab0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px auto;
          font-size: 20px;
          font-weight: bold;
          color: #483ab0;
        }

        .progress-bar {
          width: 100%;
          background: #eee;
          border-radius: 8px;
          overflow: hidden;
          height: 12px;
          margin: 15px 0;
        }

        .progress-bar span {
          display: block;
          height: 100%;
          background: #27ae60;
        }
      `}</style>
    </div>
  );
}
