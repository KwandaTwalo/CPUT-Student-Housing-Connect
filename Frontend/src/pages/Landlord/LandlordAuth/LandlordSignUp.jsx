import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLandlord } from "../../../services/landlordService";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  altPhone: "",
  password: "",
  company: "",
  preferredContactMethod: "EMAIL",
};

const preferredContactOptions = [
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Mobile phone" },
  { value: "ALTERNATE_PHONE", label: "Alternate phone" },
];

export default function LandlordSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const payload = {
        landlordFirstName: formData.firstName.trim(),
        landlordLastName: formData.lastName.trim(),
        verified: false,
        dateRegistered: new Date().toISOString().slice(0, 10),
        password: formData.password,
        accommodationList: [],
        contact: {
          email: formData.email.trim(),
          phoneNumber: formData.phone.trim() || null,
          alternatePhoneNumber: formData.altPhone.trim() || null,
          isEmailVerified: false,
          isPhoneVerified: false,
          preferredContactMethod: formData.preferredContactMethod,
        },
      };

      const landlord = await createLandlord(payload);
      setFeedback({
        type: "success",
        message: `Great news ${landlord?.landlordFirstName ?? formData.firstName}! Your profile is awaiting verification.`,
      });

      setTimeout(() => {
        navigate("/landlord/login", {
          replace: true,
          state: { message: "Account created successfully. Please sign in." },
        });
      }, 1600);
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Unable to create the account." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="auth-page gradient-light">
        <div className="auth-shell" style={{ maxWidth: 820 }}>
          <section className="auth-card light">
            <div className="auth-card-header">
              <h1>Landlord onboarding</h1>
              <p>Join the verified community of landlords helping CPUT students find safe, modern accommodation.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-grid two-column">
                <label className="form-field">
                  <span>First name</span>
                  <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input"
                      placeholder="Sipho"
                      required
                  />
                </label>
                <label className="form-field">
                  <span>Last name</span>
                  <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input"
                      placeholder="Mbeki"
                      required
                  />
                </label>
                <label className="form-field">
                  <span>Business / company name</span>
                  <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                      placeholder="Optional"
                  />
                </label>
                <label className="form-field">
                  <span>Email address</span>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="landlord@housing.co.za"
                      required
                  />
                </label>
                <label className="form-field">
                  <span>Mobile number</span>
                  <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="071 234 5678"
                  />
                </label>
                <label className="form-field">
                  <span>Alternate contact</span>
                  <input
                      type="tel"
                      name="altPhone"
                      value={formData.altPhone}
                      onChange={handleChange}
                      className="input"
                      placeholder="Optional"
                  />
                </label>
                <label className="form-field">
                  <span>Preferred contact method</span>
                  <select
                      name="preferredContactMethod"
                      className="select"
                      value={formData.preferredContactMethod}
                      onChange={handleChange}
                  >
                    {preferredContactOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="form-field">
                <span>Password</span>
                <div className="password-field">
                  <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input"
                      placeholder="Create a secure password"
                      minLength={8}
                      required
                  />
                  <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((previous) => !previous)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {feedback && <div className={`alert ${feedback.type}`}>{feedback.message}</div>}

              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating profile..." : "Create landlord account"}
              </button>
            </form>

            <div className="helper-text" style={{ marginTop: 20 }}>
              Already verified? <Link to="/landlord/login">Return to login</Link>
            </div>
          </section>
        </div>
      </div>
  );
}
