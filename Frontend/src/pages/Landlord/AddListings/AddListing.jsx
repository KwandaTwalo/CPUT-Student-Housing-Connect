import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaList, FaPlusCircle, FaUsers, FaBuilding } from "react-icons/fa";

export default function AddListing() {
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
              <NavLink to="/my-listings" end>
                <FaList /> My Listings
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-listing" end className="active-link">
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

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Create New Listing</h1>
        </header>

        <div className="form-card">
          <form className="listing-form">
            <input type="text" placeholder="Accommodation Name" />
            <input type="number" placeholder="Number of Rooms" />
            <textarea placeholder="Description"></textarea>
            <button type="submit" className="btn-primary">
              Save Listing
            </button>
          </form>
        </div>
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

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 40px;
        }

        .header h1 {
          font-size: 26px;
          margin-bottom: 25px;
        }

        /* Form Card */
        .form-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          max-width: 500px;
        }

        .listing-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        input,
        textarea {
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #483ab0;
          box-shadow: 0 0 0 2px rgba(72,58,176,0.2);
        }

        textarea {
          resize: none;
          height: 100px;
        }

        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #372a8a;
        }
      `}</style>
    </div>
  );
}
