import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaPlusCircle, FaUsers, FaBuilding } from "react-icons/fa";
import { logout } from "../../../services/authService";

const initialForm = {
  name: "",
  rooms: "",
  description: "",
};

export default function AddListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const summary = [
      `Name: ${formData.name || "n/a"}`,
      `Rooms: ${formData.rooms || "n/a"}`,
      selectedImage ? `Image selected: ${selectedImage.name}` : "No image selected",
    ].join("\n");
    alert(`Listing saved (demo):\n${summary}`);
    setFormData(initialForm);
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

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
            <div className="sidebar-footer">
              <button type="button" className="btn-logout" onClick={handleLogout}>
                Sign out
              </button>
            </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Create New Listing</h1>
          <button type="button" className="btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </header>

        <div className="form-card">
          <form className="listing-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Accommodation Name"
                required
            />
            <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="Number of Rooms"
                min="0"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            ></textarea>
            <label className="file-picker">
              <span>Listing image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Selected listing" />
                </div>
            )}
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
          padding: 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
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

        /* Form Card */
        .form-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          max-width: 520px;
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

        .file-picker {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-weight: 500;
        }

        .file-picker input {
          padding: 10px;
        }

        .image-preview {
          border: 1px dashed #cbd5f5;
          border-radius: 12px;
          overflow: hidden;
          max-height: 240px;
        }

        .image-preview img {
          display: block;
          width: 100%;
          object-fit: cover;
        }

        .btn-primary {
          background: #483ab0;
          color: white;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s;
        }

        .btn-primary:hover {
          background: #372a8a;
        }
      `}</style>
    </div>
  );
}
