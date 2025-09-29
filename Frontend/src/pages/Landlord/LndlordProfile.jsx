import React from "react";
import { Link } from "react-router-dom";
import { FaHome,
  FaList,
  FaUser,
  FaUsers,
   FaCheckCircle,
    FaTimesCircle,
  FaBuilding, } from "react-icons/fa";

export default function LandlordProfilePage() {
  // Example landlord data
  const landlord = {
    landlordID: 1,
    landlordFirstName: "John",
    landlordLastName: "Doe",
    isVerified: true,
    dateRegistered: "2023-04-15",
    password: "********",
    profilePicture: "/profile-pic.jpg", // Path to profile picture
  };

  return (
    <div className="landlord-profile-page">
      {/* Sidebar can be reused from Dashboard if needed */}
      <aside className="sidebar">
      <div className="sidebar-profile">
        <p className="profile-role">Landlord</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/landlord/dashboard">
              <FaHome style={{ marginRight: "8px" }} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/my-listings">
              <FaList style={{ marginRight: "8px" }} /> My Listings
            </Link>
          </li>
          <li>
            <Link to="/applications-requests">
              <FaUsers style={{ marginRight: "8px" }} /> Applications
            </Link>
          </li>
          <li>
            <Link to="/assign-accommodation">
              <FaBuilding style={{ marginRight: "8px" }} /> Assign Accommodation
            </Link>
          </li>
          <li>
            <Link to="/landlord-profile">
              <FaUser style={{ marginRight: "8px" }} /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="header">
          <h1>My Profile</h1>
        </header>

        <section className="profile-details">
          <div className="profile-card">
            <img
              src={landlord.profilePicture}
              alt="Profile"
              className="profile-img-large"
            />
            <h2>
              {landlord.landlordFirstName} {landlord.landlordLastName}{" "}
              {landlord.isVerified ? (
                <FaCheckCircle className="verified-icon" />
              ) : (
                <FaTimesCircle className="unverified-icon" />
              )}
            </h2>
            <p>
              <strong>Landlord ID:</strong> {landlord.landlordID}
            </p>
            <p>
              <strong>Date Registered:</strong> {landlord.dateRegistered}
            </p>
            <p>
              <strong>Password:</strong> {landlord.password}
            </p>
            <Link to="/edit-profile">
              <button className="btn-primary">Edit Profile</button>
            </Link>
          </div>
        </section>
      </main>

      {/* Styles */}
      <style>{`
        .landlord-profile-page {
          display: flex;
          min-height: 100vh;
          font-family: "Segoe UI", sans-serif;
          background: #f5f7fb;
        }

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
          font-weight: bold;
        }

         .profile-role {
  font-size: 20px; /* make it big */
  font-weight: bold;
  margin-bottom: 10px;
  color: #1485f7ff; /* adjust to match your theme */
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
          display: block;
          padding: 10px;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .sidebar nav a:hover {
          background: #483ab0;
          color: #fff;
        }

        .main-content {
          flex: 1;
          padding: 30px;
        }

        .header h1 {
          margin-bottom: 30px;
        }

        .profile-details {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          width: 400px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        .profile-img-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-bottom: 15px;
        }

        .verified-icon {
          color: #27ae60;
          margin-left: 8px;
        }

        .unverified-icon {
          color: #e74c3c;
          margin-left: 8px;
        }

        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
