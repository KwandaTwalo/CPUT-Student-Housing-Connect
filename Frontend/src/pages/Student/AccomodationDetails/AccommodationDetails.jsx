import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAccommodation } from "../../../services/accommodationService";
function AccommodationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [accommodation, setAccommodation] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAccommodation = async () => {
            try {
                const data = await fetchAccommodation(id);
                setAccommodation(data);
            } catch (serviceError) {
                setError(serviceError.message);
            } finally {
                setLoading(false);
            }
        };

        loadAccommodation();
    }, [id]);

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loadingCard}>Loading accommodation details...</div>
            </div>
        );
    }

    if (error || !accommodation) {
        return (
            <div style={styles.page}>
                <div style={styles.errorCard}>
                    <h2>We could not load this listing</h2>
                    <p>{error || "The accommodation may have been removed."}</p>
                    <button style={styles.primaryButton} onClick={() => navigate(-1)}>
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const wifiIncluded = accommodation.isWifiAvailable ?? accommodation.wifiAvailable;
    const furnished = accommodation.isFurnished ?? accommodation.furnished;
    const utilitiesIncluded = accommodation.isUtilitiesIncluded ?? accommodation.utilitiesIncluded;
    const roomTypeLabel = accommodation.roomType?.toLowerCase?.();
    const statusLabel = accommodation.accommodationStatus?.toLowerCase?.();
    const landlordVerified =
        accommodation.landlord?.verified ?? accommodation.landlord?.isVerified ?? false;
  return (
      <div style={styles.page}>
          <div style={styles.header}>
              <button style={styles.backButton} onClick={() => navigate(-1)}>
                  ← Back to results
              </button>
              <h1 style={styles.title}>
                  R{accommodation.rent?.toFixed(2)} / month
              </h1>
              <p style={styles.subtitle}>
                  {accommodation.address?.streetNumber} {accommodation.address?.streetName},
                  {" "}
                  {accommodation.address?.suburb}, {accommodation.address?.city}
              </p>
          </div>

          <div style={styles.contentGrid}>
              <section style={styles.mainCard}>
                  <h2>Overview</h2>
                  <p>
                      This {roomTypeLabel} room is {statusLabel} and located
                      {" "}
                      {accommodation.distanceFromCampus?.toFixed(1)} km from campus.
                  </p>

                  <div style={styles.featureGrid}>
                      <div style={styles.featureCard}>
                          <span style={styles.featureLabel}>Wi-Fi</span>
                          <span>{wifiIncluded ? "Included" : "Not included"}</span>
                      </div>
                      <div style={styles.featureCard}>
                          <span style={styles.featureLabel}>Furnished</span>
                          <span>{furnished ? "Yes" : "No"}</span>
                      </div>
                      <div style={styles.featureCard}>
                          <span style={styles.featureLabel}>Utilities</span>
                          <span>{utilitiesIncluded ? "Included" : "Excluded"}</span>
                      </div>
                      <div style={styles.featureCard}>
                          <span style={styles.featureLabel}>Bathroom</span>
                          <span>{accommodation.bathroomType}</span>
                      </div>
                  </div>

                  {accommodation.bookings?.length > 0 && (
                      <div style={styles.notice}>
                          <h3>Recent bookings</h3>
                          <p>
                              There are currently {accommodation.bookings.length} booking(s) associated with this listing. Confirmed students may
                              move in from {accommodation.bookings[0].checkInDate}.
                          </p>
                      </div>
                  )}
              </section>

              <aside style={styles.sidebar}>
                  <div style={styles.sidebarCard}>
                      <h3>Landlord details</h3>
                      <p style={styles.landlordName}>
                          {accommodation.landlord?.landlordFirstName} {accommodation.landlord?.landlordLastName}
                      </p>
                      <p style={styles.landlordEmail}>{accommodation.landlord?.contact?.email}</p>
                      <p style={styles.landlordPhone}>{accommodation.landlord?.contact?.phoneNumber}</p>
                      <p style={styles.landlordVerification}>
                          {landlordVerified ? "This landlord has been verified by CPUT." : "Awaiting verification."}
                      </p>
                  </div>
              </aside>
          </div>
    </div>
  );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)",
        padding: "40px 32px 80px",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#0f172a",
    },
    loadingCard: {
        maxWidth: "480px",
        margin: "120px auto",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
    },
    errorCard: {
        maxWidth: "520px",
        margin: "120px auto",
        backgroundColor: "#fff",
        padding: "32px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 20px 55px rgba(15, 23, 42, 0.12)",
    },
    header: {
        maxWidth: "960px",
        margin: "0 auto 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    backButton: {
        alignSelf: "flex-start",
        border: "none",
        background: "none",
        color: "#1d4ed8",
        cursor: "pointer",
        fontSize: "14px",
    },
    title: {
        margin: 0,
        fontSize: "36px",
        fontWeight: 700,
    },
    subtitle: {
        margin: 0,
        color: "#475569",
    },
    contentGrid: {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "24px",
    },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: "18px",
        padding: "28px",
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
        border: "1px solid rgba(148, 163, 184, 0.18)",
    },
    featureGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
        marginTop: "24px",
    },
    featureCard: {
        padding: "14px",
        borderRadius: "14px",
        backgroundColor: "rgba(148, 163, 184, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    featureLabel: {
        fontSize: "13px",
        color: "#475569",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
    },
    notice: {
        marginTop: "24px",
        padding: "18px",
        borderRadius: "14px",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
    },
    sidebar: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    sidebarCard: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.1)",
        border: "1px solid rgba(148, 163, 184, 0.18)",
    },
    landlordName: {
        fontWeight: 700,
        marginBottom: "4px",
    },
    landlordEmail: {
        margin: "4px 0",
        color: "#1d4ed8",
    },
    landlordPhone: {
        margin: "0 0 12px",
        color: "#475569",
    },
    landlordVerification: {
        margin: 0,
        fontSize: "14px",
        color: "#047857",
    },
    primaryButton: {
        marginTop: "16px",
        padding: "12px 24px",
        borderRadius: "999px",
        border: "none",
        backgroundColor: "#1d4ed8",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
    },
};
export default AccommodationDetails;