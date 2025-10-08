import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

export default function StudentSignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Welcome ${form.firstName || "student"}! (demo account)`);
        navigate("/student/login");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Student Sign Up</h2>
                <p style={styles.subtitle}>Create an account to start finding accommodation.</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    <div style={styles.passwordField}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            style={{ ...styles.input, marginBottom: 0 }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={styles.toggleButton}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit" style={styles.button}>
                        Create Account
                    </button>
                </form>
                <p style={styles.helper}>
                    Already have an account? <Link to="/student/login" style={styles.link}>Login</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eff3ff 0%, #f8f9fb 100%)",
        padding: "40px 16px",
    },
    card: {
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 24px 60px rgba(15, 37, 64, 0.12)",
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    title: {
        fontSize: "30px",
        margin: 0,
        color: "#0f2540",
    },
    subtitle: {
        margin: 0,
        color: "#53627c",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    input: {
        width: "100%",
        padding: "12px 14px",
        borderRadius: "10px",
        border: "1px solid #d6ddec",
        fontSize: "15px",
        outline: "none",
        transition: "border 0.2s ease, box-shadow 0.2s ease",
    },
    passwordField: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    toggleButton: {
        padding: "12px 14px",
        borderRadius: "10px",
        border: "1px solid #d6ddec",
        background: "#f1f5f9",
        cursor: "pointer",
        fontWeight: 600,
    },
    button: {
        marginTop: "6px",
        padding: "12px 16px",
        background: "#0f2540",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: 600,
    },
    helper: {
        margin: 0,
        textAlign: "center",
        color: "#53627c",
    },
    link: {
        color: "#0f2540",
        fontWeight: 600,
        textDecoration: "none",
    },
};