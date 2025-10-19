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
    confirmPassword: "",
    gender: "",
    fundingStatus: "FUNDED",
    dateOfBirth: "",
};

const fundingOptions = [
    { value: "FUNDED", label: "NSFAS / bursary funded" },
    { value: "SELF_FUNDED", label: "Self-funded" },
    { value: "NOT_FUNDED", label: "Not yet funded" },
];

const passwordRequirements = [
    { id: "length", label: "At least 12 characters", test: (value) => value.length >= 12 },
    { id: "lower", label: "Lowercase letter", test: (value) => /[a-z]/.test(value) },
    { id: "upper", label: "Uppercase letter", test: (value) => /[A-Z]/.test(value) },
    { id: "number", label: "Number", test: (value) => /\d/.test(value) },
    { id: "symbol", label: "Special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const strengthCopy = {
    weak: { label: "Weak", color: "#dc2626" },
    medium: { label: "Almost there", color: "#f59e0b" },
    strong: { label: "Strong", color: "#16a34a" },
};

const evaluatePasswordStrength = (value) => {
    const trimmed = value.trim();
    const requirementResults = passwordRequirements.map((requirement) => ({
        ...requirement,
        met: requirement.test(trimmed),
    }));
    const metCount = requirementResults.filter((item) => item.met).length;
    let status = "weak";
    if (metCount >= 4 && trimmed.length >= 12) {
        status = "strong";
    } else if (metCount >= 3 && trimmed.length >= 10) {
        status = "medium";
    }

    const meterValue = trimmed ? Math.min(100, Math.round((metCount / passwordRequirements.length) * 100)) : 0;
    return { status, meterValue, requirementResults };
};

export default function StudentSignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(() => evaluatePasswordStrength(""));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
        if (name === "password") {
            setPasswordStrength(evaluatePasswordStrength(value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback(null);
        setIsSubmitting(true);

        try {
            const trimmedPassword = form.password.trim();
            const trimmedConfirmPassword = form.confirmPassword.trim();

            if (!passwordStrength.requirementResults.every((requirement) => requirement.met)) {
                setFeedback({
                    type: "error",
                    message: "Please create a stronger password that meets all security requirements.",
                });
                setIsSubmitting(false);
                return;
            }

            if (trimmedPassword !== trimmedConfirmPassword) {
                setFeedback({ type: "error", message: "Passwords do not match. Please confirm your password." });
                setIsSubmitting(false);
                return;
            }

            const trimmedEmail = form.email.trim().toLowerCase();
            const payload = {
                studentName: form.firstName.trim(),
                studentSurname: form.lastName.trim(),
                gender: form.gender || undefined,
                password: trimmedPassword,
                isStudentVerified: false,
                fundingStatus: form.fundingStatus,
                contact: {
                    email: trimmedEmail,
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
            setForm(initialForm);
            setPasswordStrength(evaluatePasswordStrength(""));

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
                            <div
                                style={{
                                    marginTop: 8,
                                    background: "#f1f5f9",
                                    borderRadius: 999,
                                    height: 8,
                                    overflow: "hidden",
                                }}
                                aria-hidden="true"
                            >
                                <div
                                    style={{
                                        height: "100%",
                                        width: `${passwordStrength.meterValue}%`,
                                        background: strengthCopy[passwordStrength.status].color,
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </div>
                            <p style={{ marginTop: 6, fontSize: 12, color: "#475569" }}>
                                Password strength: <strong>{strengthCopy[passwordStrength.status].label}</strong>
                            </p>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: "8px 0 0",
                                    padding: 0,
                                    display: "grid",
                                    gap: 4,
                                    fontSize: 12,
                                    color: "#475569",
                                }}
                            >
                                {passwordStrength.requirementResults.map((requirement) => (
                                    <li
                                        key={requirement.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            color: requirement.met ? "#16a34a" : "#64748b",
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: requirement.met ? "#16a34a" : "#cbd5f5",
                                            }}
                                        />
                                        {requirement.label}
                                    </li>
                                ))}
                            </ul>
                        </label>
                        <label className="form-field">
                            <span>Confirm password</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="input"
                                placeholder="Re-enter your password"
                                required
                            />
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
