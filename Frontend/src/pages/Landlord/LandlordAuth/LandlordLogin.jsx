/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandlordLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ For now, just redirect to LandlordDashboard
    if (username && password) {
      navigate("/landlord/dashboard");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Landlord Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <a href="/landlord/signup" style={styles.link}>
            Sign up
          </a>
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
*/
