import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
function Logout() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        logout();
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            navigate("/login", {
                replace: true,
                state: { message: "You have been signed out." },
            });
            return;
        }

        const timer = window.setTimeout(() => {
            setCountdown((current) => current - 1);
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [countdown, navigate]);
  return (
      <div style={styles.container}>
          <div style={styles.card}>
              <h1 style={styles.title}>Signing out</h1>
              <p style={styles.message}>
                  Your session has ended. You will be redirected to the login page in
                  {" "}
                  <strong>{countdown}</strong> seconds.
              </p>
              <button
                  type="button"
                  style={styles.button}
                  onClick={() => navigate("/login", { replace: true })}
              >
                  Go to login now
              </button>
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
        textAlign: "center",
    },
    title: {
        fontSize: "28px",
        marginBottom: "12px",
        color: "#0f2540",
    },
    message: {
        fontSize: "15px",
        color: "#39445b",
        marginBottom: "24px",
    },
    button: {
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
};

export default Logout;