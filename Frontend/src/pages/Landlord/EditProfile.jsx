import React, { useEffect, useState } from "react";

const initialProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(+27) 71 234 5678",
    bio: "Dedicated landlord providing comfortable student housing near campus.",
    profilePicture: "/profile-pic.jpg",
};

export default function EditProfile() {
    const [profile, setProfile] = useState(initialProfile);
    const [previewImage, setPreviewImage] = useState(initialProfile.profilePicture);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        return () => {
            if (previewImage && previewImage !== initialProfile.profilePicture) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        if (previewImage && previewImage !== initialProfile.profilePicture) {
            URL.revokeObjectURL(previewImage);
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        } else {
            setPreviewImage(initialProfile.profilePicture);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedFields = [
            `First name: ${profile.firstName}`,
            `Last name: ${profile.lastName}`,
            selectedFile ? `Profile image: ${selectedFile.name}` : "Profile image unchanged",
        ].join("\n");
        alert(`Profile changes saved (demo state).\n${updatedFields}`);
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <header>
                    <h1>Edit Profile</h1>
                    <p>Update your personal details to keep your profile accurate.</p>
                </header>

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="image-field">
                        <span>Profile picture</span>
                        <div className="image-preview">
                            <img src={previewImage} alt="Selected profile" />
                        </div>
                        <label className="upload-button">
                            Choose image
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
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
        
        .image-field {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .image-preview {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #0055aa;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: #003366;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .upload-button input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
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