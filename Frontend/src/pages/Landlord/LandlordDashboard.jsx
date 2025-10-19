import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import LandlordLayout from "../../components/landlord/LandlordLayout";
import { getCurrentUser } from "../../services/authService";
import { fetchLandlordListings } from "../../services/accommodationService";
import { listBookings } from "../../services/bookingService";

const buildStats = (listings = [], bookings = []) => {
  const totalListings = listings.length;
  const availableListings = listings.filter((listing) => listing.status === "AVAILABLE").length;
  const occupiedListings = totalListings - availableListings;

  const totalApplications = bookings.length;
  const approvedApplications = bookings.filter((booking) => booking.bookingStatus === "CONFIRMED").length;
  const inProgressApplications = bookings.filter((booking) => booking.bookingStatus === "IN_PROGRESS").length;

  const occupancyRate = totalListings === 0 ? 0 : Math.round((occupiedListings / totalListings) * 100);
  const processedRate = totalApplications === 0 ? 0 : Math.round((approvedApplications / totalApplications) * 100);

  return {
    totalListings,
    availableListings,
    occupiedListings,
    totalApplications,
    approvedApplications,
    inProgressApplications,
    occupancyRate,
    processedRate,
  };
};

const formatAddress = (listing) => {
  const parts = [listing.streetAddress, listing.suburb, listing.city].filter(Boolean).join(", ");
  return parts || `Listing #${listing.id}`;
};

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "landlord") {
      navigate("/landlord/login", {
        replace: true,
        state: { message: "Please sign in as a landlord to access the dashboard." },
      });
    }
  }, [currentUser, navigate]);

  const loadDashboardData = useCallback(async () => {
    if (!currentUser?.userId) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const [landlordListings, landlordBookings] = await Promise.all([
        fetchLandlordListings(currentUser.userId),
        listBookings({ landlordId: currentUser.userId }),
      ]);

      setListings(Array.isArray(landlordListings) ? landlordListings : []);
      setBookings(Array.isArray(landlordBookings) ? landlordBookings : []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const stats = buildStats(listings, bookings);

  const filteredListings = useMemo(() => {
    if (!searchTerm) {
      return listings;
    }
    const term = searchTerm.toLowerCase();
    return listings.filter((listing) => formatAddress(listing).toLowerCase().includes(term));
  }, [listings, searchTerm]);

  return (
      <LandlordLayout
          title="Dashboard overview"
          description="Monitor your portfolio, track applications and keep your listings in great shape."
          actions={(handleLogout) => (
              <>
                <div className="search-box">
                  <FaSearch aria-hidden="true" />
                  <input
                      type="text"
                      placeholder="Search listings"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <button type="button" className="icon-button" aria-label="Notifications">
                  <FaBell />
                </button>
                <Link to="/add-listing" className="btn-primary">
                  + Create listing
                </Link>
                <button type="button" className="btn-secondary" onClick={handleLogout}>
                  Sign out
                </button>
              </>
          )}
      >
        {error && <div className="alert error">{error}</div>}
        {isLoading ? (
            <p style={{ margin: 0 }}>Loading your dashboard...</p>
        ) : (
            <>
              <section className="stats-grid">
                <article className="stat-card accent-purple">
                  <h3>Active listings</h3>
                  <p>{stats.totalListings}</p>
                </article>
                <article className="stat-card accent-green">
                  <h3>Applications</h3>
                  <p>{stats.totalApplications}</p>
                  <small style={{ display: "block", marginTop: 6, color: "rgba(226, 232, 240, 0.75)" }}>
                    {stats.inProgressApplications} in review
                  </small>
                </article>
                <article className="stat-card accent-amber">
                  <h3>Occupied</h3>
                  <p>{stats.occupiedListings}</p>
                </article>
                <article className="stat-card accent-sky">
                  <h3>Available</h3>
                  <p>{stats.availableListings}</p>
                </article>
              </section>

              <section className="progress-grid">
                <article className="progress-card">
                  <h3>Occupancy rate</h3>
                  <div className="progress-circle">{stats.occupancyRate}%</div>
                  <p style={{ margin: 0, color: "rgba(226, 232, 240, 0.78)" }}>
                    {stats.occupiedListings} of {stats.totalListings} listings occupied.
                  </p>
                </article>
                <article className="progress-card">
                  <h3>Applications processed</h3>
                  <div className="progress-bar">
                    <span style={{ width: `${stats.processedRate}%` }} />
                  </div>
                  <p style={{ marginTop: 12, color: "rgba(226, 232, 240, 0.78)" }}>
                    {stats.approvedApplications} approved applications
                  </p>
                </article>
              </section>

              <section className="listing-grid">
                {filteredListings.length === 0 ? (
                    <p style={{ margin: 0 }}>No listings match your search criteria.</p>
                ) : (
                    filteredListings.map((listing) => (
                        <article className="listing-card" key={listing.id}>
                          <h3>{formatAddress(listing)}</h3>
                          <p>
                            Rent{" "}
                            {new Intl.NumberFormat("en-ZA", {
                              style: "currency",
                              currency: "ZAR",
                              maximumFractionDigits: 0,
                            }).format(listing.rent)}{" "}
                            · {listing.roomType?.replace(/_/g, " ")}
                          </p>
                          <div className="progress-bar">
                                        <span
                                            style={{
                                              width: `${listing.status === "AVAILABLE" ? 25 : 90}%`,
                                            }}
                                        />
                          </div>
                        </article>
                    ))
                )}
              </section>
            </>
        )}
      </LandlordLayout>
  );
}
