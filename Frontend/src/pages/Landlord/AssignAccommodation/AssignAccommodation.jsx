import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import { getCurrentUser } from "../../../services/authService";
import {
  fetchAccommodation,
  fetchLandlordListings,
  updateAccommodation,
} from "../../../services/accommodationService";
import { fetchBooking, listBookings, updateBooking } from "../../../services/bookingService";

const buildLabelForBooking = (booking) => {
  const studentName = [booking.student?.studentName, booking.student?.studentSurname]
      .filter(Boolean)
      .join(" ")
      .trim();

  const createdDate = booking.requestDate ? new Date(booking.requestDate).toLocaleDateString() : null;

  return [studentName || booking.student?.contact?.email || `Booking #${booking.bookingID}`, createdDate]
      .filter(Boolean)
      .join(" · ");
};

const buildLabelForListing = (listing) => {
  const address = [listing.streetAddress, listing.suburb, listing.city].filter(Boolean).join(", ");
  return address || `Listing #${listing.id}`;
};

export default function AssignAccommodation() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [selectedListingId, setSelectedListingId] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "landlord") {
      navigate("/landlord/login", {
        replace: true,
        state: { message: "Please sign in as a landlord to assign accommodation." },
      });
    }
  }, [currentUser, navigate]);

  const loadData = useCallback(async () => {
    if (!currentUser?.userId) {
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const [allBookings, landlordListings] = await Promise.all([
        listBookings({ landlordId: currentUser.userId }),
        fetchLandlordListings(currentUser.userId, { status: "AVAILABLE" }),
      ]);

      const unassignedBookings = (allBookings || []).filter(
          (booking) => booking.bookingStatus === "IN_PROGRESS" || !booking.accommodation?.accommodationID
      );

      setBookings(unassignedBookings);
      setListings(
          Array.isArray(landlordListings)
              ? landlordListings.filter((listing) => listing.status === "AVAILABLE")
              : []
      );
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Unable to load data." });
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedBookingId || !selectedListingId) {
      setFeedback({ type: "error", message: "Please choose both a booking and an accommodation." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const bookingId = Number(selectedBookingId);
      const listingId = Number(selectedListingId);

      const bookingDetails = await fetchBooking(bookingId);
      const updatedBooking = await updateBooking({
        ...bookingDetails,
        accommodation: { accommodationID: listingId },
        bookingStatus: "CONFIRMED",
      });

      try {
        const accommodationDetails = await fetchAccommodation(listingId);
        await updateAccommodation({
          ...accommodationDetails,
          accommodationStatus: "FULL",
        });
      } catch (accommodationError) {
        console.warn("Unable to update accommodation status", accommodationError);
      }

      setFeedback({
        type: "success",
        message: `Booking #${updatedBooking.bookingID} assigned successfully.`,
      });

      setSelectedBookingId("");
      setSelectedListingId("");
      await loadData();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Assignment failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <LandlordLayout
          title="Assign accommodation"
          description="Match successful applicants with their new space, all in one streamlined workflow."
          actions={(handleLogout) => (
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Sign out
              </button>
          )}
      >
        <section className="assign-card light" style={{ display: "grid", gap: 24 }}>
          <header className="auth-card-header" style={{ marginBottom: 0 }}>
            <h2 style={{ margin: 0 }}>Quick assignment</h2>
            <p style={{ margin: "6px 0 0", color: "var(--color-slate-500)" }}>
              Select an approved booking and connect it to one of your available listings.
            </p>
          </header>

          {feedback && <div className={`alert ${feedback.type}`}>{feedback.message}</div>}

          {isLoading ? (
              <p style={{ margin: 0 }}>Loading bookings and listings...</p>
          ) : bookings.length === 0 ? (
              <p style={{ margin: 0 }}>No pending bookings require assignment right now.</p>
          ) : listings.length === 0 ? (
              <p style={{ margin: 0 }}>You currently have no available listings to assign.</p>
          ) : (
              <form className="form-grid" onSubmit={handleSubmit}>
                <label className="form-field">
                  <span>Select booking</span>
                  <select
                      className="select"
                      value={selectedBookingId}
                      onChange={(event) => setSelectedBookingId(event.target.value)}
                      required
                  >
                    <option value="" disabled>
                      -- Choose booking --
                    </option>
                    {bookings.map((booking) => (
                        <option key={booking.bookingID} value={booking.bookingID}>
                          {buildLabelForBooking(booking)}
                        </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Select accommodation</span>
                  <select
                      className="select"
                      value={selectedListingId}
                      onChange={(event) => setSelectedListingId(event.target.value)}
                      required
                  >
                    <option value="" disabled>
                      -- Choose accommodation --
                    </option>
                    {listings.map((listing) => (
                        <option key={listing.id} value={listing.id}>
                          {buildLabelForListing(listing)}
                        </option>
                    ))}
                  </select>
                </label>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Assigning..." : "Assign"}
                </button>
              </form>
          )}
        </section>
      </LandlordLayout>
  );
}
