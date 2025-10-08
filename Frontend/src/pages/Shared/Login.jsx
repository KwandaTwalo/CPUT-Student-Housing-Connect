import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as authenticate } from "../../services/authService";
import AppName from "../../components/shared/AppName";

const roles = [
  { id: "student", label: "Student" },
  { id: "landlord", label: "Landlord" },
  { id: "admin", label: "Administrator" },
];

function Login({ defaultRole = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(location.state?.message || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const resolveRedirect = useCallback(
      (resolvedRole) => {
        switch (resolvedRole) {
          case "student":
            return "/student/search";
          case "landlord":
            return "/landlord/dashboard";
          case "admin":
            return "/admin/dashboard";
          default:
            return location.state?.from?.pathname || "/";
        }
      },
      [location.state]
  );

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
      const destination = resolveRedirect(authenticatedUser.role || role);
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div style={styles.container}>
        <div style={styles.backdrop} />

        <div style={styles.shell}>
          <div style={styles.introPanel}>
            <div style={styles.branding}>
              <AppName />
              <span style={styles.brandingTag}>Secure access portal</span>
            </div>
            <h2 style={styles.introTitle}>Welcome back to your housing hub</h2>
            <p style={styles.introCopy}>
              Choose your role and sign in to continue matching with verified listings, managing applications or
              verifying accommodation quality.
            </p>
            <ul style={styles.highlightList}>
              <li>One login for students, landlords and administrators.</li>
              <li>Consistent, responsive design across every page.</li>
              <li>Protected with modern authentication services.</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h1 style={styles.title}>Secure sign in</h1>
            <p style={styles.subtitle}>Use your role-based credentials to access the experience tailored to you.</p>

            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.roleGroup}>
                <span style={styles.roleLabel}>I am signing in as</span>
                <div style={styles.roles}>
                  {roles.map((option) => (
                      <button
                          key={option.id}
                          type="button"
                          onClick={() => setRole(option.id)}
                          style={{
                            ...styles.roleButton,
                            ...(role === option.id ? styles.roleButtonActive : {}),
                          }}
                      >
                        {option.label}
                      </button>
                  ))}
                </div>
              </div>

              <label style={styles.fieldLabel}>
                Email address
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={styles.input}
                    placeholder="you@example.com"
                    required
                />
              </label>

              <label style={styles.fieldLabel}>
                Password
                <div style={styles.passwordField}>
                  <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      style={{ ...styles.input, marginBottom: 0 }}
                      placeholder="Enter your password"
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
              </label>

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
              <h3 style={styles.helperTitle}>Need demo credentials?</h3>
              <ul style={styles.credentialList}>
                <li>Student — student@cput.ac.za / Student1234</li>
                <li>Landlord — sipho.mbeki@rentconnect.co.za / Landlord1234</li>
                <li>Admin — admin@cput-housing.co.za / Admin1234</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 16px",
    background: "radial-gradient(circle at top, #0f172a 0%, #0b456a 50%, #082f49 100%)",
    color: "#0f2540",
    overflow: "hidden",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(135deg, rgba(8, 47, 73, 0.85) 0%, rgba(2, 132, 199, 0.65) 45%, rgba(125, 211, 252, 0.25) 100%)",
    filter: "blur(2px)",
  },
  shell: {
    position: "relative",
    zIndex: 1,
    width: "min(1040px, 100%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    alignItems: "stretch",
    background: "rgba(248, 250, 252, 0.1)",
    borderRadius: "28px",
    padding: "32px",
    backdropFilter: "blur(16px)",
    boxShadow: "0 40px 120px rgba(8, 47, 73, 0.4)",
  },
  introPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    color: "#f8fafc",
  },
  branding: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  brandingTag: {
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    fontSize: "12px",
    color: "rgba(191, 219, 254, 0.8)",
    fontWeight: 600,
  },
  introTitle: {
    fontSize: "2rem",
    margin: 0,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  introCopy: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.8)",
  },
  highlightList: {
    margin: 0,
    paddingLeft: "18px",
    lineHeight: 1.6,
    color: "rgba(226, 232, 240, 0.78)",
    fontSize: "14px",
  },
  card: {
    backgroundColor: "rgba(248, 250, 252, 0.96)",
    borderRadius: "24px",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "#0f2540",
    boxShadow: "0 24px 70px rgba(15, 37, 64, 0.18)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
    color: "#0f172a",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#475569",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  roleGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  roleLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0f172a",
  },
  roles: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
  },
  roleButton: {
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "#f8fafc",
    color: "#1e293b",
    padding: "12px 14px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  roleButtonActive: {
    borderColor: "#1d4ed8",
    background: "rgba(37, 99, 235, 0.12)",
    color: "#1d4ed8",
    boxShadow: "0 14px 30px rgba(37, 99, 235, 0.25)",
  },
  fieldLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#0f172a",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#fff",
    boxShadow: "inset 0 1px 0 rgba(148, 163, 184, 0.08)",
  },
  passwordField: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  toggleButton: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "#f1f5f9",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13px",
    color: "#1f2937",
  },
  button: {
    marginTop: "6px",
    padding: "14px 16px",
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    boxShadow: "0 18px 45px rgba(29, 78, 216, 0.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  error: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#b91c1c",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 600,
  },
  helperText: {
    marginTop: "8px",
    padding: "20px",
    background: "rgba(241, 245, 249, 0.85)",
    borderRadius: "18px",
    color: "#1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  helperTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
    color: "#0f172a",
  },
  credentialList: {
    margin: 0,
    paddingLeft: "18px",
    lineHeight: 1.6,
    fontSize: "14px",
    color: "#1f2937",
  },
};

export default Login;
