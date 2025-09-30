import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as authenticate } from "../../services/authService";

const roles = [
  { id: "student", label: "Student" },
  { id: "landlord", label: "Landlord" },
  { id: "admin", label: "Administrator" },
];

function Login({ defaultRole = "" }) {  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(location.state?.message || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultRole && role !== defaultRole) {
      setRole(defaultRole);
    }
  }, [defaultRole, role]);

  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location.state]);

  const redirectPath = useMemo(() => {
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }

    switch (role) {
      case "student":
        return "/student/search";
      case "landlord":
        return "/landlord/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  }, [location.state, role]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);
    try {
      const authenticatedUser = await authenticate(role, email, password);
      if (!authenticatedUser) {
        setError("Unable to log in. Please try again.");
        return;
      }
      navigate(redirectPath, { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>
          Sign in with your email address and password to continue.
        </p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.roleGroup}>
            <span style={styles.roleLabel}>I am signing in as:</span>
            <div style={styles.roles}>
              {roles.map((option) => (
                  <label key={option.id} style={styles.label}>
                    <input
                        type="radio"
                        value={option.id}
                        checked={role === option.id}
                        onChange={(event) => setRole(event.target.value)}
                    />
                    {option.label}
                  </label>
              ))}
            </div>
          </div>

          <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={styles.input}
              required
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={styles.input}
              required
          />

          {error && <div style={styles.error}>{error}</div>}

          <button
              type="submit"
              style={{
                ...styles.button,
                ...(isSubmitting ? styles.buttonDisabled : {}),
              }}
              disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
        <div style={styles.helperText}>
          <p>Use one of the demo accounts to sign in:</p>
          <ul style={styles.credentialList}>
            <li>Student — student@example.com / Student123!</li>
            <li>Landlord — landlord@example.com / Landlord123!</li>
            <li>Admin — admin@example.com / Admin123!</li>
          </ul>
        </div>
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
    padding: "40px 16px",  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 24px 60px rgba(15, 37, 64, 0.12)",
    padding: "40px 36px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px",
    color: "#0f2540",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "15px",
    color: "#53627c",
    marginBottom: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  roleGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  roleLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0f2540",
  },
  roles: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#39445b",
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
  button: {
    marginTop: "6px",
    padding: "12px 16px",
    background: "#0f2540",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  error: {
    background: "#fdecea",
    color: "#b71c1c",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  helperText: {
    marginTop: "24px",
    padding: "16px",
    background: "#f4f6fb",
    borderRadius: "12px",
    color: "#39445b",
    fontSize: "14px",
  },
  credentialList: {
    marginTop: "8px",
    marginBottom: 0,
    paddingLeft: "18px",
    lineHeight: 1.6,  },
};

export default Login;
