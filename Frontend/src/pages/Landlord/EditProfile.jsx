import React, { useState } from "react";

const initialProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(+27) 71 234 5678",
    bio: "Dedicated landlord providing comfortable student housing near campus.",
};

export default function EditProfile() {
    const [profile, setProfile] = useState(initialProfile);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Hook this up to the backend update profile endpoint when available
        alert("Profile changes saved (demo state).");
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <header>
                    <h1>Edit Profile</h1>
                    <p>Update your personal details to keep your profile accurate.</p>
                </header>

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <label className="form-field">
                        <span>First name</span>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Last name</span>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Email address</span>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Phone number</span>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-field">
                        <span>Bio</span>
                        <textarea
                            name="bio"
                            rows="4"
                            value={profile.bio}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
        .edit-profile-page {
          min-height: 100vh;
          background: #f5f7fb;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          font-family: "Segoe UI", sans-serif;
        }

        .edit-profile-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          width: min(600px, 100%);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
        }

        .edit-profile-card header h1 {
          margin-bottom: 10px;
          font-size: 28px;
          color: #003366;
        }

        .edit-profile-card header p {
          margin: 0 0 30px;
          color: #5f6c7b;
        }

        .edit-profile-form {
          display: grid;
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #2f3b4c;
        }

        .form-field input,
        .form-field textarea {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #d0d7e2;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: #0055aa;
          box-shadow: 0 0 0 3px rgba(0, 85, 170, 0.15);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #003366, #0055aa);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(0, 85, 170, 0.2);
        }

        .btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}