import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createStudent } from "../../../services/studentService";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    password: "",
    gender: "",
    fundingStatus: "FUNDED",
    dateOfBirth: "",
};

const fundingOptions = [
    { value: "FUNDED", label: "NSFAS / bursary funded" },
    { value: "SELF_FUNDED", label: "Self-funded" },
    { value: "NOT_FUNDED", label: "Not yet funded" },
];

export default function StudentSignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback(null);
        setIsSubmitting(true);

        try {
            const payload = {
                studentName: form.firstName.trim(),
                studentSurname: form.lastName.trim(),
                gender: form.gender || undefined,
                password: form.password,
                isStudentVerified: false,
                fundingStatus: form.fundingStatus,
                contact: {
                    email: form.email.trim(),
                    phoneNumber: form.phone.trim() || undefined,
                    alternatePhoneNumber: form.altPhone.trim() || undefined,
                    isEmailVerified: false,
                    isPhoneVerified: false,
                    preferredContactMethod: "EMAIL",
                },
            };

            if (form.dateOfBirth) {
                payload.dateOfBirth = form.dateOfBirth;
            }

            payload.registrationDate = new Date().toISOString().slice(0, 19);

            const createdStudent = await createStudent(payload);
            setFeedback({
                type: "success",
                message: `Welcome ${createdStudent?.studentName ?? form.firstName}! Your account has been created.`,
            });

            setTimeout(() => {
                navigate("/student/login", {
                    replace: true,
                    state: { message: "Account created successfully. Please log in." },
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
            <div className="auth-shell" style={{ maxWidth: 880 }}>
                <section className="auth-card light">
                    <div className="auth-card-header">
                        <h1>Student registration</h1>
                        <p>Tell us a bit about yourself to unlock curated accommodation and tools built for CPUT students.</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-grid two-column">
                            <label className="form-field">
                                <span>First name</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Thando"
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Last name</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Jacobs"
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Email address</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="student@cput.ac.za"
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Mobile number</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="061 234 5678"
                                />
                            </label>
                            <label className="form-field">
                                <span>Alternate contact</span>
                                <input
                                    type="tel"
                                    name="altPhone"
                                    value={form.altPhone}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Optional guardian contact"
                                />
                            </label>
                            <label className="form-field">
                                <span>Date of birth</span>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={form.dateOfBirth}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </label>
                        </div>

                        <div className="form-grid two-column">
                            <label className="form-field">
                                <span>Gender</span>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="select"
                                >
                                    <option value="">Prefer not to say</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Non-binary">Non-binary</option>
                                </select>
                            </label>
                            <label className="form-field">
                                <span>Funding status</span>
                                <select
                                    name="fundingStatus"
                                    value={form.fundingStatus}
                                    onChange={handleChange}
                                    className="select"
                                    required
                                >
                                    {fundingOptions.map((option) => (
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
                                    value={form.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Create a secure password"
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
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                    <div className="helper-text" style={{ marginTop: 20 }}>
                        Already have an account? <Link to="/student/login">Login</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
