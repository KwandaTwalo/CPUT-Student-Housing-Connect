import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LandlordLayout from "../../components/landlord/LandlordLayout";
import { getCurrentUser } from "../../services/authService";
import { fetchLandlord } from "../../services/landlordService";

const resolveDisplayName = (landlord) =>
    [landlord?.landlordFirstName, landlord?.landlordLastName].filter(Boolean).join(" ").trim();

export default function LandlordProfilePage() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [landlord, setLandlord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "landlord") {
      navigate("/landlord/login", {
        replace: true,
        state: { message: "Please sign in as a landlord to view your profile." },
      });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const loadLandlord = async () => {
      if (!currentUser?.userId) {
        return;
      }

      setIsLoading(true);
      setError("");
      try {
        const data = await fetchLandlord(currentUser.userId);
        setLandlord(data);
      } catch (profileError) {
        setError(profileError.message || "Unable to load your profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadLandlord();
  }, [currentUser]);

  const verified = landlord?.isVerified ?? landlord?.verified ?? false;
  const contact = landlord?.contact;

  return (
      <LandlordLayout
          title="My profile"
          description="Keep your details accurate so students and the housing office can reach you with ease."
          actions={(handleLogout) => (
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Sign out
              </button>
          )}
      >
        <section className="profile-card" style={{ display: "grid", gap: 24 }}>
          {error && <div className="alert error">{error}</div>}

          {isLoading ? (
              <p style={{ margin: 0 }}>Loading your profile...</p>
          ) : !landlord ? (
              <p style={{ margin: 0 }}>No profile information found.</p>
          ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  <div
                      className="profile-avatar"
                      aria-hidden="true"
                      style={{ width: 96, height: 96, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {resolveDisplayName(landlord)?.charAt(0)?.toUpperCase() || "L"}
                  </div>
                  <div>
                    <h2 style={{ margin: "0 0 8px" }}>
                      {resolveDisplayName(landlord) || "Landlord"}
                      {verified ? (
                          <FaCheckCircle className="verified-icon" style={{ marginLeft: 10, color: "#4ade80" }} />
                      ) : (
                          <FaTimesCircle className="unverified-icon" style={{ marginLeft: 10, color: "#f87171" }} />
                      )}
                    </h2>
                    <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.75)" }}>{contact?.email || "—"}</p>
                    <p style={{ margin: "6px 0 0", color: "rgba(226, 232, 240, 0.75)" }}>{contact?.phoneNumber || "—"}</p>
                  </div>
                </div>

                <dl>
                  <dt>Landlord ID</dt>
                  <dd>{landlord.landlordID ?? "—"}</dd>
                  <dt>Date registered</dt>
                  <dd>{landlord.dateRegistered ?? "—"}</dd>
                  <dt>Verification status</dt>
                  <dd>{verified ? "Verified" : "Pending verification"}</dd>
                  <dt>Preferred contact</dt>
                  <dd>{contact?.preferredContactMethod ?? "EMAIL"}</dd>
                </dl>

                <div>
                  <Link to="/edit-profile" className="btn-primary">
                    Edit profile
                  </Link>
                </div>
              </>
          )}
        </section>
      </LandlordLayout>
  );
}
