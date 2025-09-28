import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role to continue!");
      return;
    }
    if (selectedRole === "landlord") {
      navigate("/landlord/signup");
    } else if (selectedRole === "student") {
      navigate("/student/signup");
    } else if (selectedRole === "admin") {
      navigate("/admin/signup");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.subtitle}>Select Your Role</h3>
          <div style={styles.roles}>
            <label style={styles.label}>
              <input
                type="radio"
                value="student"
                checked={selectedRole === "student"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              Student
            </label>
            <label style={styles.label}>
              <input
                type="radio"
                value="landlord"
                checked={selectedRole === "landlord"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              Landlord
            </label>
            <label style={styles.label}>
              <input
                type="radio"
                value="admin"
                checked={selectedRole === "admin"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              Admin
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
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
    border: "2px solid #282c34",
    borderRadius: "8px",
    padding: "10px",
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
    margin: "20px 0 10px",
    color: "#34495e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  roles: {
    display: "flex",
    justifyContent: "space-around",
    margin: "15px 0",
  },
  label: {
    fontSize: "16px",
    color: "#333",
  },
  button: {
    marginTop: "20px",
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

export default SignUp;
