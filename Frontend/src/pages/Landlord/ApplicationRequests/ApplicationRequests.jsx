import React from "react";
import { NavLink , Link } from "react-router-dom";
import { FaHome, FaList, FaPlusCircle, FaUsers, FaBuilding } from "react-icons/fa";

export default function ApplicationRequests() {
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
              <NavLink to="/add-listing" end>
                <FaPlusCircle /> Add Listing
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications-requests" end className="active-link">
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
          <h1>Applications</h1>
        </header>

        <div className="applications-card">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Accommodation</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Student Residence A</td>
                <td><span className="badge pending">Pending</span></td>
                <td>
                  <button className="btn-primary">Approve</button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>House B</td>
                <td><span className="badge approved">Approved</span></td>
                <td>
                  <button className="btn-primary">Revoke</button>
                </td>
              </tr>
            </tbody>
          </table>
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

        /* Applications Card */
        .applications-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f9f9f9;
          font-weight: 600;
        }

        tr:hover td {
          background: #fafafa;
        }

        /* Badges */
        .badge {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }

        .badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .badge.approved {
          background: #d4edda;
          color: #155724;
        }

        .badge.rejected {
          background: #f8d7da;
          color: #721c24;
        }

        /* Buttons */
        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: 0.2s;
        }

        .btn-primary:hover {
          background: #372a8a;
        }
      `}</style>
    </div>
  );
}
