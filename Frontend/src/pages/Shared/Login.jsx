import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (!role) {
      alert("Please select a role before continuing!");
      return;
    }

    if (role === "student") {
      navigate("/student/login");
    } else if (role === "landlord") {
      navigate("/landlord/login");
    } else if (role === "admin") {
      navigate("/admin/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <h3 style={styles.subtitle}>Select Your Role</h3>
        <div style={styles.roles}>
          <label style={styles.label}>
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
            />
            Student
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              value="landlord"
              checked={role === "landlord"}
              onChange={(e) => setRole(e.target.value)}
            />
            Landlord
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Continue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "18px",
    margin: "20px 0 15px",
    color: "#34495e",
  },
  roles: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#282c34",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Login;
