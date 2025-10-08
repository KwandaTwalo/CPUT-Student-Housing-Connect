import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function LandlordSignup() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account created for: ${formData.username}`);
    navigate("/landlord/dashboard"); // redirect to dashboard
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Landlord Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Last Name"
            value={formData.surname}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <div style={styles.passwordField}>
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
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
            Sign Up
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{" "}
           <Link to="/landlord/login" style={styles.link}>
         Login
        </Link>
      </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#003366",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  passwordField: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  toggleButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f1f5f9",
    cursor: "pointer",
    fontWeight: 600,
  },
  button: {
    padding: "12px",
    marginTop: "12px",
    background: "#003366",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#003366",
  },
  link: {
    color: "#0055aa",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
