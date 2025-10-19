import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import { getCurrentUser } from "../../../services/authService";
import { fetchLandlordListings } from "../../../services/accommodationService";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(
        Number(value ?? 0)
    );

const formatAddress = (listing) => {
  const parts = [listing.streetAddress, listing.suburb, listing.city].filter(Boolean).join(", ");
  return parts || `Listing #${listing.id}`;
};

export default function MyListings() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "landlord") {
      navigate("/landlord/login", {
        replace: true,
        state: { message: "Please sign in as a landlord to manage your listings." },
      });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const loadListings = async () => {
      if (!currentUser?.userId) {
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetchLandlordListings(currentUser.userId);
        setListings(Array.isArray(response) ? response : []);
      } catch (loadError) {
        setError(loadError.message || "Unable to load listings.");
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [currentUser]);

  return (
      <LandlordLayout
          title="My listings"
          description="Keep your portfolio fresh and highlight the spaces that students love."
          actions={(handleLogout) => (
              <>
                <Link to="/add-listing" className="btn-primary">
                  + Add listing
                </Link>
                <button type="button" className="btn-secondary" onClick={handleLogout}>
                  Sign out
                </button>
              </>
          )}
      >
        <section className="listing-grid">
          {error && <div className="alert error">{error}</div>}
          {isLoading ? (
              <p style={{ margin: 0 }}>Loading listings...</p>
          ) : listings.length === 0 ? (
              <p style={{ margin: 0 }}>No listings found yet. Start by creating your first listing.</p>
          ) : (
              listings.map((listing) => (
                  <article className="listing-card" key={listing.id}>
                    <h3>{formatAddress(listing)}</h3>
                    <p>
                      {formatCurrency(listing.rent)} · {listing.roomType?.replace(/_/g, " ") || "Room"}
                    </p>
                    <p style={{ margin: "6px 0", color: "rgba(226, 232, 240, 0.75)" }}>
                      Status: {listing.status?.toLowerCase() || "unknown"}
                    </p>
                    <div className="progress-bar">
                                <span
                                    style={{
                                      width: `${listing.status === "AVAILABLE" ? 30 : 90}%`,
                                    }}
                                />
                    </div>
                  </article>
              ))
          )}
        </section>
      </LandlordLayout>
  );
}
