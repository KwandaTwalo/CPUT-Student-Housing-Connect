import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedRole) {
      setError("Please select a role to continue.");
      return;
    }

    switch (selectedRole) {
      case "landlord":
        navigate("/landlord/signup");
        break;
      case "student":
        navigate("/student/signup");
        break;
      case "admin":
        navigate("/admin/signup");
        break;
      default:
        setError("Please select a valid role to continue.");
    }
  };

  return (
      <div className="auth-page gradient-light">
        <div className="auth-shell" style={{ maxWidth: 720 }}>
          <section className="auth-card light">
            <div className="auth-card-header">
              <h1>Create your CPUT Housing Connect account</h1>
              <p>Choose how you will use the platform so we can tailor the experience to your needs.</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <span>Select your role</span>
                <div className="auth-roles">
                  {[
                    { id: "student", label: "Student", description: "Discover and apply for verified accommodation." },
                    { id: "landlord", label: "Landlord", description: "Manage listings, applications and verifications." },
                    { id: "admin", label: "Administrator", description: "Oversee verifications and community quality." },
                  ].map((roleOption) => (
                      <label
                          key={roleOption.id}
                          className={`auth-role${selectedRole === roleOption.id ? " selected" : ""}`}
                      >
                        <input
                            className="role-input"
                            type="radio"
                            name="role"
                            value={roleOption.id}
                            checked={selectedRole === roleOption.id}
                            onChange={(event) => {
                              setSelectedRole(event.target.value);
                              setError("");
                            }}
                        />
                        <strong>{roleOption.label}</strong>
                        <span style={{ display: "block", marginTop: 6, fontSize: 13, fontWeight: 400 }}>
                                            {roleOption.description}
                                        </span>
                      </label>
                  ))}
                </div>
              </div>

              {error && <div className="alert error">{error}</div>}

              <button type="submit" className="btn-primary">
                Continue
              </button>
            </form>
            <div className="helper-text" style={{ marginTop: 24 }}>
              Already onboard? <Link to="/login">Return to login</Link>
            </div>
          </section>
        </div>
      </div>
  );
}

export default SignUp;
